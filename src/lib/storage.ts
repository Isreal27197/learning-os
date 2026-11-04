export type DiaryEntry = {
  id: string;
  date: string;
  topic: string;
  learned: string;
  blockers: string;
  next: string;
  minutes: number;
};

export type Goal = {
  id: string;
  title: string;
  due: string;
  done: boolean;
};

export type StudySession = {
  id: string;
  date: string;
  topic: string;
  seconds: number;
  startedAt?: string;
  endedAt?: string;
  durationMs?: number;
};

export type StorageKey =
  | 'los-completed'
  | 'los-notes'
  | 'los-goals'
  | 'los-sessions'
  | 'los-learning-checkpoints'
  | 'los-exercise-attempts'
  | 'los-learning-notes'
  | 'los-weekly-plans'
  | 'los-career'
  | 'los-library'
  | 'los-tools';

export type LoadResult<T> =
  | { status: 'valid'; value: T; canSave: true }
  | { status: 'missing'; value: T; canSave: true }
  | { status: 'invalid'; value: T; canSave: false; error: string }
  | { status: 'unavailable'; value: T; canSave: false; error: string };

export type SaveResult = { ok: true } | { ok: false; error: string };

type Validator<T> = (value: unknown) => value is T;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';
const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
const isNonNegativeFiniteNumber = (value: unknown): value is number =>
  isFiniteNumber(value) && value >= 0;

export const isCompletedLessons = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

export const isDiaryEntry = (value: unknown): value is DiaryEntry =>
  isRecord(value) &&
  isString(value.id) &&
  isString(value.date) &&
  isString(value.topic) &&
  isString(value.learned) &&
  isString(value.blockers) &&
  isString(value.next) &&
  isFiniteNumber(value.minutes);

export const isDiaryEntries = (value: unknown): value is DiaryEntry[] =>
  Array.isArray(value) && value.every(isDiaryEntry);

export const isGoal = (value: unknown): value is Goal =>
  isRecord(value) &&
  isString(value.id) &&
  isString(value.title) &&
  isString(value.due) &&
  typeof value.done === 'boolean';

export const isGoals = (value: unknown): value is Goal[] =>
  Array.isArray(value) && value.every(isGoal);

export const isStudySession = (value: unknown): value is StudySession => {
  if (
    !isRecord(value) ||
    !isString(value.id) ||
    !isString(value.date) ||
    !isString(value.topic) ||
    !isNonNegativeFiniteNumber(value.seconds)
  ) {
    return false;
  }
  if ('startedAt' in value && !isString(value.startedAt)) return false;
  if ('endedAt' in value && !isString(value.endedAt)) return false;
  if ('durationMs' in value && !isNonNegativeFiniteNumber(value.durationMs)) return false;
  return true;
};

export const isStudySessions = (value: unknown): value is StudySession[] =>
  Array.isArray(value) && value.every(isStudySession);

export function loadRecord<T>(key: StorageKey, fallback: T, validate: Validator<T>): LoadResult<T> {
  let stored: string | null;
  try {
    stored = localStorage.getItem(key);
  } catch (error) {
    return {
      status: 'unavailable',
      value: fallback,
      canSave: false,
      error: `Could not read local storage: ${errorMessage(error)}`,
    };
  }

  if (stored === null) return { status: 'missing', value: fallback, canSave: true };

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    return {
      status: 'invalid',
      value: fallback,
      canSave: false,
      error: `Stored JSON is malformed: ${errorMessage(error)}`,
    };
  }

  if (!validate(parsed)) {
    return {
      status: 'invalid',
      value: fallback,
      canSave: false,
      error: 'Stored data does not match the expected record shape.',
    };
  }

  return { status: 'valid', value: parsed, canSave: true };
}

export function saveRecord<T>(key: StorageKey, value: T, validate: Validator<T>): SaveResult {
  if (!validate(value)) {
    return {
      ok: false,
      error: 'Refused to save data that does not match the expected record shape.',
    };
  }

  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch (error) {
    return { ok: false, error: `Could not serialize data: ${errorMessage(error)}` };
  }

  try {
    localStorage.setItem(key, serialized);
  } catch (error) {
    return { ok: false, error: `Could not write to local storage: ${errorMessage(error)}` };
  }

  return { ok: true };
}

export function effectiveSessionDurationMs(session: {
  seconds: number;
  durationMs?: unknown;
}): number {
  if (isNonNegativeFiniteNumber(session.durationMs)) return session.durationMs;
  return session.seconds * 1000;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
