import { curriculumOutline } from '../curriculum/outline.generated';
import { CAREER_SKILLS } from './career';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';
import { loadRecord, saveRecord, type LoadResult, type SaveResult } from './storage';

export type LibraryResourceType =
  | 'documentation'
  | 'article'
  | 'paper'
  | 'tutorial'
  | 'course'
  | 'video'
  | 'book'
  | 'tool'
  | 'other';
export type LibraryResourceStatus = 'saved' | 'planned' | 'learning' | 'completed' | 'archived';
export type LibraryPriority = 'low' | 'medium' | 'high';

export type LibraryResource = {
  id: string;
  title: string;
  url: string;
  type: LibraryResourceType;
  description: string;
  source: string;
  author?: string;
  tags: string[];
  dateAdded: string;
  rating?: number;
  priority?: LibraryPriority;
  status: LibraryResourceStatus;
  notes: string;
  lessonIds: string[];
  skillIds: string[];
  projectIds: ProjectId[];
  estimatedMinutes?: number;
};

export const LIBRARY_STORAGE_KEY = 'los-library' as const;
export const LIBRARY_RESOURCE_TYPES: readonly LibraryResourceType[] = [
  'documentation',
  'article',
  'paper',
  'tutorial',
  'course',
  'video',
  'book',
  'tool',
  'other',
];
export const LIBRARY_RESOURCE_STATUSES: readonly LibraryResourceStatus[] = [
  'saved',
  'planned',
  'learning',
  'completed',
  'archived',
];
export const LIBRARY_PRIORITIES: readonly LibraryPriority[] = ['low', 'medium', 'high'];
export const LIBRARY_LESSONS = curriculumOutline.flatMap((stage) =>
  stage.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title, stage: stage.name })),
);
export const LIBRARY_SKILLS = CAREER_SKILLS.map(({ id, name, category }) => ({
  id,
  name,
  category,
}));
export const LIBRARY_PROJECTS = PROJECT_LADDER.map(({ id, title }) => ({ id, title }));

const resourceTypes = new Set<string>(LIBRARY_RESOURCE_TYPES);
const resourceStatuses = new Set<string>(LIBRARY_RESOURCE_STATUSES);
const priorities = new Set<string>(LIBRARY_PRIORITIES);
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string => typeof value === 'string';
const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.trim().length > 0;
const isDate = (value: unknown): value is string => {
  if (!isString(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const isHttpUrl = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};
const isOptionalNumber = (value: unknown, min: number, max = Number.MAX_SAFE_INTEGER) =>
  value === undefined ||
  (typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max);
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);
const hasUnique = (values: string[]) => new Set(values).size === values.length;

export const isLibraryResource = (value: unknown): value is LibraryResource =>
  isRecord(value) &&
  isNonEmptyString(value.id) &&
  isNonEmptyString(value.title) &&
  isHttpUrl(value.url) &&
  isString(value.type) &&
  resourceTypes.has(value.type) &&
  isString(value.description) &&
  isString(value.source) &&
  (!('author' in value) || isString(value.author)) &&
  isStringArray(value.tags) &&
  isDate(value.dateAdded) &&
  isOptionalNumber(value.rating, 1, 5) &&
  (!('priority' in value) || (isString(value.priority) && priorities.has(value.priority))) &&
  isString(value.status) &&
  resourceStatuses.has(value.status) &&
  isString(value.notes) &&
  isStringArray(value.lessonIds) &&
  isStringArray(value.skillIds) &&
  isStringArray(value.projectIds) &&
  isOptionalNumber(value.estimatedMinutes, 1) &&
  hasUnique(value.tags) &&
  hasUnique(value.lessonIds) &&
  hasUnique(value.skillIds) &&
  hasUnique(value.projectIds);

export const isLibraryResources = (value: unknown): value is LibraryResource[] =>
  Array.isArray(value) &&
  value.every(isLibraryResource) &&
  new Set(value.map((resource) => resource.id)).size === value.length;

export const loadLibraryResources = (): LoadResult<LibraryResource[]> =>
  loadRecord('los-library', [], isLibraryResources);

export const saveLibraryResources = (resources: LibraryResource[]): SaveResult =>
  saveRecord('los-library', resources, isLibraryResources);
