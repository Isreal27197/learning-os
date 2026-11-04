import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const sourcePath = path.join(root, 'src', 'data.ts');
const lessonsDirectory = path.join(root, 'src', 'lessons');
const outlinePath = path.join(root, 'src', 'curriculum', 'outline.generated.ts');
const loadersPath = path.join(root, 'src', 'curriculum', 'lessonLoaders.generated.ts');
const metadataFields = ['id', 'title', 'detail', 'status', 'category'];
const checkOnly = process.argv.includes('--check');

function fail(message) {
  console.error(`[generate:outline] ${message}`);
  process.exitCode = 1;
}

function requireString(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value;
}

function evaluateTypeScript(source, fileName) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName,
    reportDiagnostics: true,
  });
  const errors = (compiled.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length) {
    throw new Error(
      `${path.relative(root, fileName)}: ${errors
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
        .join('\n')}`,
    );
  }

  const sourceModule = { exports: {} };
  vm.runInNewContext(compiled.outputText, {
    exports: sourceModule.exports,
    require,
  });
  return sourceModule.exports;
}

async function loadLessonModules(stages) {
  const knownIds = new Set(stages.flatMap((stage) => stage.lessons.map((lesson) => lesson.id)));
  const files = (await readdir(lessonsDirectory)).filter((file) => file.endsWith('.ts')).sort();
  const modules = new Map();

  for (const file of files) {
    const id = file.slice(0, -3);
    if (!/^[A-Za-z0-9_-]+$/.test(id)) {
      throw new Error(`Lesson module filename "${file}" is not a valid lesson ID.`);
    }
    if (!knownIds.has(id)) {
      throw new Error(`Lesson module "${file}" has no matching lesson metadata in src/data.ts.`);
    }
    const modulePath = path.join(lessonsDirectory, file);
    const evaluated = evaluateTypeScript(await readFile(modulePath, 'utf8'), modulePath);
    if (Object.keys(evaluated).length !== 1 || !Object.hasOwn(evaluated, 'content')) {
      throw new Error(`Lesson module "${file}" must export only "content".`);
    }
    const content = evaluated.content;
    if (typeof content !== 'object' || content === null || Array.isArray(content)) {
      throw new Error(`Lesson module "${file}" must export a content object.`);
    }
    for (const field of metadataFields) {
      if (Object.hasOwn(content, field)) {
        throw new Error(`Lesson module "${file}" must not export metadata field "${field}".`);
      }
    }
    modules.set(id, content);
  }

  return modules;
}

function deriveOutline(stages, modules) {
  if (!Array.isArray(stages) || stages.length === 0) {
    throw new Error('No curriculum stages were found in src/data.ts.');
  }

  const stageIds = new Set();
  const lessonIds = new Set();
  return stages.map((stage, stageIndex) => {
    const id = requireString(stage.id, `Stage ${stageIndex + 1} id`);
    if (stageIds.has(id)) throw new Error(`Duplicate stage id "${id}".`);
    stageIds.add(id);
    if (!Array.isArray(stage.lessons)) {
      throw new Error(`Stage "${id}" has no lessons array.`);
    }

    return {
      id,
      name: requireString(stage.name, `Stage "${id}" name`),
      tag: requireString(stage.tag, `Stage "${id}" tag`),
      description: requireString(stage.description, `Stage "${id}" description`),
      lessons: stage.lessons.map((lesson, lessonIndex) => {
        const label = `Lesson ${lessonIndex + 1} in stage "${id}"`;
        const lessonId = requireString(lesson.id, `${label} id`);
        if (lessonIds.has(lessonId)) throw new Error(`Duplicate lesson id "${lessonId}".`);
        lessonIds.add(lessonId);
        const fields = Object.keys(lesson).sort();
        const unexpectedFields = fields.filter((field) => !metadataFields.includes(field));
        if (unexpectedFields.length) {
          throw new Error(
            `Lesson "${lessonId}" contains authored content in src/data.ts: ${unexpectedFields.join(', ')}.`,
          );
        }
        if (!['current', 'next', 'later'].includes(lesson.status)) {
          throw new Error(`Lesson "${lessonId}" has an invalid status.`);
        }

        const content = modules.get(lessonId) ?? {};
        const conceptIds = content.keyConcepts ?? [];
        const exercises = content.exercises ?? [];
        if (!Array.isArray(conceptIds) || !conceptIds.every((item) => typeof item === 'string')) {
          throw new Error(`Lesson "${lessonId}" has invalid keyConcepts.`);
        }
        if (!Array.isArray(exercises)) {
          throw new Error(`Lesson "${lessonId}" has invalid exercises.`);
        }
        const exerciseIds = new Set();
        const exerciseOutline = exercises.map((exercise, exerciseIndex) => {
          const exerciseId = requireString(
            exercise.id,
            `Exercise ${exerciseIndex + 1} in lesson "${lessonId}" id`,
          );
          if (exerciseIds.has(exerciseId)) {
            throw new Error(`Lesson "${lessonId}" has duplicate exercise id "${exerciseId}".`);
          }
          exerciseIds.add(exerciseId);
          return {
            id: exerciseId,
            title: requireString(exercise.title, `Exercise "${exerciseId}" title`),
          };
        });

        return {
          id: lessonId,
          title: requireString(lesson.title, `Lesson "${lessonId}" title`),
          detail: requireString(lesson.detail, `Lesson "${lessonId}" detail`),
          status: lesson.status,
          category: requireString(lesson.category, `Lesson "${lessonId}" category`),
          conceptIds,
          exercises: exerciseOutline,
        };
      }),
    };
  });
}

function renderOutline(outline) {
  return [
    '// GENERATED, DO NOT EDIT. Run `npm run generate:outline` to regenerate.',
    "import type { CurriculumOutlineStage } from './outlineTypes';",
    '',
    `export const curriculumOutline = ${JSON.stringify(outline, null, 2)} satisfies readonly CurriculumOutlineStage[];`,
    '',
  ].join('\n');
}

function renderLoaders(stages, modules) {
  const lessonIds = stages.flatMap((stage) => stage.lessons.map((lesson) => lesson.id));
  const loaderEntries = lessonIds
    .filter((id) => modules.has(id))
    .map((id) => `  '${id}': () => import('../lessons/${id}'),`)
    .join('\n');
  return [
    '// GENERATED, DO NOT EDIT. Run `npm run generate:outline` to regenerate.',
    "import type { LessonContent } from './lessonTypes';",
    '',
    'export const lessonLoaders = {',
    loaderEntries,
    '} satisfies Record<string, () => Promise<{ content: LessonContent }>>;',
    '',
  ].join('\n');
}

async function compareOrWrite(filePath, output) {
  if (checkOnly) {
    let existing;
    try {
      existing = await readFile(filePath, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (existing !== output) {
      const relativePath = path.relative(root, filePath);
      fail(
        `${relativePath} is missing or stale. Run \`npm run generate:outline\` and review the generated changes.`,
      );
      return false;
    }
    return true;
  }
  await writeFile(filePath, output.replace(/\r\n/g, '\n'), 'utf8');
  console.log(`[generate:outline] Wrote ${path.relative(root, filePath)}.`);
  return true;
}

async function main() {
  const source = await readFile(sourcePath, 'utf8');
  const sourceModule = evaluateTypeScript(source, sourcePath);
  const stages = sourceModule.stages;
  const modules = await loadLessonModules(stages);
  const outline = deriveOutline(stages, modules);
  const results = await Promise.all([
    compareOrWrite(outlinePath, renderOutline(outline)),
    compareOrWrite(loadersPath, renderLoaders(stages, modules)),
  ]);
  if (checkOnly && results.every(Boolean)) {
    console.log('[generate:outline] Outline and lesson loaders are current.');
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
