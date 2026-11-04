import { curriculumOutline } from '../curriculum/outline.generated';
import { loadRecord, saveRecord, type LoadResult, type SaveResult } from './storage';

export type UnderstandingStatus = 'understood' | 'needs-practice' | 'stuck';
export type ExerciseAttemptStatus = 'not-started' | 'in-progress' | 'completed' | 'needs-review';

export type LearningCheckpoint = {
  id: string;
  lessonId: string;
  title: string;
  status: UnderstandingStatus;
  reflection?: string;
  createdAt: string;
  updatedAt: string;
};

export type ExerciseTestResult = {
  input: string;
  expected: string;
  actual?: string;
  passed?: boolean;
};

export type ExerciseAttempt = {
  id: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  solution: string;
  testCases?: ExerciseTestResult[];
  status: ExerciseAttemptStatus;
  createdAt: string;
  updatedAt: string;
};

export type LearningNote = {
  id: string;
  lessonId: string;
  relatedConceptId?: string;
  relatedExerciseId?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const checkpointStatuses: readonly UnderstandingStatus[] = [
  'understood',
  'needs-practice',
  'stuck',
];
const attemptStatuses: readonly ExerciseAttemptStatus[] = [
  'not-started',
  'in-progress',
  'completed',
  'needs-review',
];
const isCheckpointStatus = (value: unknown): value is UnderstandingStatus =>
  checkpointStatuses.some((status) => status === value);
const isAttemptStatus = (value: unknown): value is ExerciseAttemptStatus =>
  attemptStatuses.some((status) => status === value);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
const isString = (value: unknown): value is string => typeof value === 'string';
const isTimestamp = (value: unknown): value is string =>
  isNonEmptyString(value) && value.includes('T') && Number.isFinite(Date.parse(value));

const curriculumLessons = new Map(
  curriculumOutline.flatMap((stage) => stage.lessons.map((lesson) => [lesson.id, lesson] as const)),
);

function isValidConceptReference(lessonId: string, conceptId: string): boolean {
  const lesson = curriculumLessons.get(lessonId);
  return Boolean(lesson?.conceptIds.includes(conceptId));
}

function isValidExerciseReference(lessonId: string, exerciseId: string): boolean {
  const lesson = curriculumLessons.get(lessonId);
  return Boolean(lesson?.exercises.some((exercise) => exercise.id === exerciseId));
}

function hasCommonFields(value: Record<string, unknown>): value is Record<string, unknown> & {
  id: string;
  lessonId: string;
  createdAt: string;
  updatedAt: string;
} {
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.lessonId) &&
    curriculumLessons.has(value.lessonId) &&
    isTimestamp(value.createdAt) &&
    isTimestamp(value.updatedAt)
  );
}

export const isLearningCheckpoint = (value: unknown): value is LearningCheckpoint =>
  isRecord(value) &&
  hasCommonFields(value) &&
  isNonEmptyString(value.title) &&
  isCheckpointStatus(value.status) &&
  (!('reflection' in value) || isString(value.reflection));

export const isLearningCheckpoints = (value: unknown): value is LearningCheckpoint[] =>
  Array.isArray(value) &&
  value.every(isLearningCheckpoint) &&
  new Set(value.map((checkpoint) => checkpoint.id)).size === value.length;

function isExerciseTestResult(value: unknown): value is ExerciseTestResult {
  if (!isRecord(value) || !isString(value.input) || !isString(value.expected)) return false;
  if ('actual' in value && !isString(value.actual)) return false;
  if ('passed' in value && typeof value.passed !== 'boolean') return false;
  return true;
}

export const isExerciseAttempt = (value: unknown): value is ExerciseAttempt => {
  if (
    !isRecord(value) ||
    !hasCommonFields(value) ||
    !isNonEmptyString(value.exerciseId) ||
    !isValidExerciseReference(value.lessonId, value.exerciseId) ||
    !isNonEmptyString(value.title) ||
    !isString(value.solution) ||
    !isAttemptStatus(value.status)
  ) {
    return false;
  }
  return (
    !('testCases' in value) ||
    (Array.isArray(value.testCases) && value.testCases.every(isExerciseTestResult))
  );
};

export const isExerciseAttempts = (value: unknown): value is ExerciseAttempt[] =>
  Array.isArray(value) &&
  value.every(isExerciseAttempt) &&
  new Set(value.map((attempt) => attempt.id)).size === value.length;

export const isLearningNote = (value: unknown): value is LearningNote => {
  if (
    !isRecord(value) ||
    !hasCommonFields(value) ||
    !isNonEmptyString(value.title) ||
    !isString(value.content)
  ) {
    return false;
  }
  if ('relatedConceptId' in value) {
    if (
      !isNonEmptyString(value.relatedConceptId) ||
      !isValidConceptReference(value.lessonId, value.relatedConceptId)
    ) {
      return false;
    }
  }
  if ('relatedExerciseId' in value) {
    if (
      !isNonEmptyString(value.relatedExerciseId) ||
      !isValidExerciseReference(value.lessonId, value.relatedExerciseId)
    ) {
      return false;
    }
  }
  return true;
};

export const isLearningNotes = (value: unknown): value is LearningNote[] =>
  Array.isArray(value) &&
  value.every(isLearningNote) &&
  new Set(value.map((note) => note.id)).size === value.length;

export const loadLearningCheckpoints = (): LoadResult<LearningCheckpoint[]> =>
  loadRecord('los-learning-checkpoints', [], isLearningCheckpoints);

export const saveLearningCheckpoints = (checkpoints: LearningCheckpoint[]): SaveResult =>
  saveRecord('los-learning-checkpoints', checkpoints, isLearningCheckpoints);

export const loadExerciseAttempts = (): LoadResult<ExerciseAttempt[]> =>
  loadRecord('los-exercise-attempts', [], isExerciseAttempts);

export const saveExerciseAttempts = (attempts: ExerciseAttempt[]): SaveResult =>
  saveRecord('los-exercise-attempts', attempts, isExerciseAttempts);

export const loadLearningNotes = (): LoadResult<LearningNote[]> =>
  loadRecord('los-learning-notes', [], isLearningNotes);

export const saveLearningNotes = (notes: LearningNote[]): SaveResult =>
  saveRecord('los-learning-notes', notes, isLearningNotes);
