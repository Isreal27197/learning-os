import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const sourcePath = path.join(root, 'src', 'data.ts');
const outputPath = path.join(root, 'src', 'curriculum', 'outline.generated.ts');
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

function deriveOutline(stages) {
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
        const lessonLabel = `Lesson ${lessonIndex + 1} in stage "${id}"`;
        const lessonId = requireString(lesson.id, `${lessonLabel} id`);
        if (lessonIds.has(lessonId)) throw new Error(`Duplicate lesson id "${lessonId}".`);
        lessonIds.add(lessonId);

        if (!['current', 'next', 'later'].includes(lesson.status)) {
          throw new Error(`Lesson "${lessonId}" has an invalid status.`);
        }
        const conceptIds = lesson.keyConcepts ?? [];
        const exercises = lesson.exercises ?? [];
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

async function main() {
  const source = await readFile(sourcePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: sourcePath,
    reportDiagnostics: true,
  });
  const errors = (compiled.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length) {
    throw new Error(
      errors
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
        .join('\n'),
    );
  }

  const sourceModule = { exports: {} };
  vm.runInNewContext(compiled.outputText, {
    exports: sourceModule.exports,
    require,
  });
  const outline = deriveOutline(sourceModule.exports.stages);
  const output = [
    '// GENERATED, DO NOT EDIT. Run `npm run generate:outline` to regenerate.',
    "import type { CurriculumOutlineStage } from './outlineTypes';",
    '',
    `export const curriculumOutline = ${JSON.stringify(outline, null, 2)} satisfies readonly CurriculumOutlineStage[];`,
    '',
  ].join('\n');

  if (checkOnly) {
    let existing;
    try {
      existing = await readFile(outputPath, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (existing !== output) {
      fail(
        'src/curriculum/outline.generated.ts is missing or stale. Run `npm run generate:outline` and review the generated changes.',
      );
      return;
    }
    console.log('[generate:outline] Outline is current.');
    return;
  }

  await writeFile(outputPath, output.replace(/\r\n/g, '\n'), 'utf8');
  console.log(`[generate:outline] Wrote ${path.relative(root, outputPath)}.`);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
