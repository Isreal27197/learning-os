import { curriculumOutline } from '../curriculum/outline.generated';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';
import { loadRecord, saveRecord, type LoadResult, type SaveResult } from './storage';

export type WeeklyOutcome = {
  id: string;
  title: string;
  completed: boolean;
};

export type WeeklyTaskStatus = 'planned' | 'in-progress' | 'completed' | 'skipped';
export type WeeklyTaskPriority = 'low' | 'medium' | 'high';

export type WeeklyTask = {
  id: string;
  title: string;
  description?: string;
  plannedDate: string;
  estimatedMinutes?: number;
  priority: WeeklyTaskPriority;
  status: WeeklyTaskStatus;
  lessonId?: string;
  projectId?: ProjectId;
  createdAt: string;
  updatedAt: string;
};

export type WeeklyReview = {
  whatWentWell: string;
  difficulties: string;
  lessonsLearned: string;
  nextPriorities: string;
};

export type WeeklyPlan = {
  id: string;
  startDate: string;
  endDate: string;
  focus: string;
  dailyFocusTaskIds?: Record<string, string>;
  outcomes: WeeklyOutcome[];
  tasks: WeeklyTask[];
  review: WeeklyReview;
  createdAt: string;
  updatedAt: string;
};

export const WEEKLY_PLANS_KEY = 'los-weekly-plans' as const;
export const WEEKLY_TASK_STATUSES: readonly WeeklyTaskStatus[] = [
  'planned',
  'in-progress',
  'completed',
  'skipped',
];
export const WEEKLY_TASK_PRIORITIES: readonly WeeklyTaskPriority[] = ['low', 'medium', 'high'];
const projectIds = new Set<string>(PROJECT_LADDER.map((project) => project.id));
const lessonIds = new Set(
  curriculumOutline.flatMap((stage) => stage.lessons.map((lesson) => lesson.id)),
);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
const isString = (value: unknown): value is string => typeof value === 'string';
const isTimestamp = (value: unknown): value is string =>
  isNonEmptyString(value) && value.includes('T') && Number.isFinite(Date.parse(value));
const isDate = (value: unknown): value is string => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const isWeeklyTaskStatus = (value: unknown): value is WeeklyTaskStatus =>
  WEEKLY_TASK_STATUSES.some((status) => status === value);
const isWeeklyTaskPriority = (value: unknown): value is WeeklyTaskPriority =>
  WEEKLY_TASK_PRIORITIES.some((priority) => priority === value);

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMonday(date: Date): Date {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOffset = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - dayOffset);
  return monday;
}

export function addLocalDays(date: Date, count: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + count);
  return result;
}

export function getWeekDates(startDate: string): string[] {
  if (!isDate(startDate)) return [];
  const [year, month, day] = startDate.split('-').map(Number);
  const start = new Date(year, month - 1, day);
  return Array.from({ length: 7 }, (_, index) => formatLocalDate(addLocalDays(start, index)));
}

function isWeeklyOutcome(value: unknown): value is WeeklyOutcome {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.title) &&
    typeof value.completed === 'boolean'
  );
}

function isWeeklyTask(value: unknown, weekDates: Set<string>): value is WeeklyTask {
  if (
    !isRecord(value) ||
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.title) ||
    !isDate(value.plannedDate) ||
    !weekDates.has(value.plannedDate) ||
    !isWeeklyTaskPriority(value.priority) ||
    !isWeeklyTaskStatus(value.status) ||
    !isTimestamp(value.createdAt) ||
    !isTimestamp(value.updatedAt)
  ) {
    return false;
  }
  if ('description' in value && !isString(value.description)) return false;
  if (
    'estimatedMinutes' in value &&
    (typeof value.estimatedMinutes !== 'number' ||
      !Number.isFinite(value.estimatedMinutes) ||
      value.estimatedMinutes <= 0)
  ) {
    return false;
  }
  if (
    'lessonId' in value &&
    (typeof value.lessonId !== 'string' || !lessonIds.has(value.lessonId))
  ) {
    return false;
  }
  if (
    'projectId' in value &&
    (typeof value.projectId !== 'string' || !projectIds.has(value.projectId))
  ) {
    return false;
  }
  return true;
}

function isDailyFocusTaskIds(value: unknown, tasks: unknown, weekDates: Set<string>): boolean {
  if (!isRecord(value) || !Array.isArray(tasks)) return false;
  return Object.entries(value).every(
    ([date, taskId]) =>
      isDate(date) &&
      weekDates.has(date) &&
      isNonEmptyString(taskId) &&
      tasks.some((task) => isRecord(task) && task.id === taskId && task.plannedDate === date),
  );
}

export const isWeeklyPlan = (value: unknown): value is WeeklyPlan => {
  if (
    !isRecord(value) ||
    !isNonEmptyString(value.id) ||
    !isDate(value.startDate) ||
    !isDate(value.endDate) ||
    !isString(value.focus) ||
    ('dailyFocusTaskIds' in value && !isRecord(value.dailyFocusTaskIds)) ||
    !Array.isArray(value.outcomes) ||
    !value.outcomes.every(isWeeklyOutcome) ||
    !Array.isArray(value.tasks) ||
    !isRecord(value.review) ||
    !isString(value.review.whatWentWell) ||
    !isString(value.review.difficulties) ||
    !isString(value.review.lessonsLearned) ||
    !isString(value.review.nextPriorities) ||
    !isTimestamp(value.createdAt) ||
    !isTimestamp(value.updatedAt)
  ) {
    return false;
  }
  const weekDates = getWeekDates(value.startDate);
  const [startYear, startMonth, startDay] = value.startDate.split('-').map(Number);
  const weekStart = new Date(startYear, startMonth - 1, startDay);
  if (
    weekStart.getDay() !== 1 ||
    weekDates.length !== 7 ||
    weekDates[0] !== value.startDate ||
    weekDates[6] !== value.endDate ||
    value.id !== `week-${value.startDate}` ||
    !value.tasks.every((task) => isWeeklyTask(task, new Set(weekDates)))
  ) {
    return false;
  }
  if (
    'dailyFocusTaskIds' in value &&
    !isDailyFocusTaskIds(value.dailyFocusTaskIds, value.tasks, new Set(weekDates))
  ) {
    return false;
  }
  return (
    new Set(value.outcomes.map((outcome) => outcome.id)).size === value.outcomes.length &&
    new Set(value.tasks.map((task) => task.id)).size === value.tasks.length
  );
};

export const isWeeklyPlans = (value: unknown): value is WeeklyPlan[] =>
  Array.isArray(value) &&
  value.every(isWeeklyPlan) &&
  new Set(value.map((plan) => plan.id)).size === value.length &&
  new Set(value.map((plan) => plan.startDate)).size === value.length;

export const loadWeeklyPlans = (): LoadResult<WeeklyPlan[]> =>
  loadRecord(WEEKLY_PLANS_KEY, [], isWeeklyPlans);

export const saveWeeklyPlans = (plans: WeeklyPlan[]): SaveResult =>
  saveRecord(WEEKLY_PLANS_KEY, plans, isWeeklyPlans);
