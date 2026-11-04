import type { Lesson } from '../data';
import { curriculumOutline } from './outline.generated';
import { lessonLoaders } from './lessonLoaders.generated';
import type { LessonContent, LessonMetadata } from './lessonTypes';

const lessonMetadata = new Map<string, LessonMetadata>(
  curriculumOutline.flatMap((stage) =>
    stage.lessons.map(
      ({ id, title, detail, status, category }) =>
        [id, { id, title, detail, status, category }] as const,
    ),
  ),
);
const loaders: Readonly<Record<string, () => Promise<{ content: LessonContent }>>> = lessonLoaders;
const loadedLessons = new Map<string, Promise<Lesson>>();
const failedModuleUrls = new Map<string, string>();
let retrySequence = 0;

function retryUrlFor(error: unknown): string | undefined {
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/https?:\/\/[^\s)]+/);
  if (!match) return undefined;
  const url = new URL(match[0]);
  url.searchParams.set('los-retry', String(++retrySequence));
  return url.href;
}

function importRetryUrl(url: string): Promise<{ content: LessonContent }> {
  // The URL comes from the failed literal import; a unique query bypasses the browser's cached rejection.
  const module: Promise<{ content: LessonContent }> = import(/* @vite-ignore */ url);
  return module;
}

export function loadLesson(id: string): Promise<Lesson> {
  const metadata = lessonMetadata.get(id);
  if (!metadata) return Promise.reject(new Error(`Unknown lesson ID "${id}".`));

  const cached = loadedLessons.get(id);
  if (cached) return cached;

  const loader = loaders[id];
  if (!loader) {
    const result = Promise.resolve(metadata);
    loadedLessons.set(id, result);
    return result;
  }

  const failedUrl = failedModuleUrls.get(id);
  const imported = (failedUrl ? importRetryUrl(failedUrl) : loader()).then(({ content }) => {
    failedModuleUrls.delete(id);
    return { ...metadata, ...content };
  });
  const result = imported.catch((error: unknown) => {
    if (loadedLessons.get(id) === result) loadedLessons.delete(id);
    const retryUrl = retryUrlFor(error);
    if (retryUrl) failedModuleUrls.set(id, retryUrl);
    throw error;
  });
  loadedLessons.set(id, result);
  return result;
}

export function prefetchLesson(id: string): void {
  void loadLesson(id).catch(() => undefined);
}
