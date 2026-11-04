import { curriculumOutline } from '../curriculum/outline.generated';
import { CAREER_SKILLS } from './career';
import { PROJECT_LADDER } from '../projectLadder';
import { loadRecord, saveRecord, type LoadResult, type SaveResult } from './storage';

export type ToolStatus =
  'not-explored' | 'exploring' | 'learning' | 'using' | 'mastered' | 'archived';
export type ToolPriority = 'low' | 'medium' | 'high';

export type ToolRecord = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  status: ToolStatus;
  priority: ToolPriority;
  notes: string;
  tags: string[];
  lessonIds: string[];
  skillIds: string[];
  projectIds: string[];
  dateAdded: string;
  lastUpdated: string;
};

export const TOOLS_STORAGE_KEY = 'los-tools' as const;
export const TOOL_STATUSES: readonly ToolStatus[] = [
  'not-explored',
  'exploring',
  'learning',
  'using',
  'mastered',
  'archived',
];
export const TOOL_PRIORITIES: readonly ToolPriority[] = ['low', 'medium', 'high'];
export const DEFAULT_TOOL_CATEGORIES = [
  'Programming languages',
  'Development environments',
  'Version control',
  'Operating systems',
  'Databases',
  'Data science and ML libraries',
  'Deep learning frameworks',
  'MLOps and deployment',
  'Cloud platforms',
  'AI infrastructure',
  'APIs and developer services',
  'Productivity and utilities',
] as const;
export const TOOL_LESSONS = curriculumOutline.flatMap((stage) =>
  stage.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title })),
);
export const TOOL_SKILLS = CAREER_SKILLS.map(({ id, name }) => ({ id, name }));
export const TOOL_PROJECTS = PROJECT_LADDER.map(({ id, title }) => ({ id, title }));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string => typeof value === 'string';
const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.trim().length > 0;
const isLocalDate = (value: unknown): value is string => {
  if (!isString(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const isTimestamp = (value: unknown): value is string =>
  isNonEmptyString(value) && Number.isFinite(Date.parse(value));
const isHttpUrl = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);
const unique = (values: string[]) => new Set(values).size === values.length;
const isToolStatus = (value: unknown): value is ToolStatus =>
  typeof value === 'string' && TOOL_STATUSES.some((status) => status === value);
const isToolPriority = (value: unknown): value is ToolPriority =>
  typeof value === 'string' && TOOL_PRIORITIES.some((priority) => priority === value);

export const isToolRecord = (value: unknown): value is ToolRecord =>
  isRecord(value) &&
  isNonEmptyString(value.id) &&
  isNonEmptyString(value.name) &&
  isNonEmptyString(value.category) &&
  isString(value.description) &&
  isHttpUrl(value.url) &&
  isToolStatus(value.status) &&
  isToolPriority(value.priority) &&
  isString(value.notes) &&
  isStringArray(value.tags) &&
  isStringArray(value.lessonIds) &&
  isStringArray(value.skillIds) &&
  isStringArray(value.projectIds) &&
  isLocalDate(value.dateAdded) &&
  isTimestamp(value.lastUpdated) &&
  unique(value.tags) &&
  unique(value.lessonIds) &&
  unique(value.skillIds) &&
  unique(value.projectIds);

export const isToolRecords = (value: unknown): value is ToolRecord[] =>
  Array.isArray(value) &&
  value.every(isToolRecord) &&
  new Set(value.map((tool) => tool.id)).size === value.length;

export const loadToolRecords = (): LoadResult<ToolRecord[]> =>
  loadRecord(TOOLS_STORAGE_KEY, [], isToolRecords);

export const saveToolRecords = (tools: ToolRecord[]): SaveResult =>
  saveRecord(TOOLS_STORAGE_KEY, tools, isToolRecords);
