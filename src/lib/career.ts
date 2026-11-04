import { curriculumOutline } from '../curriculum/outline.generated';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';
import { loadRecord, saveRecord, type LoadResult, type SaveResult } from './storage';

export type CareerSkillStatus = 'not-started' | 'learning' | 'practicing' | 'demonstrated';
export type ApplicationStatus =
  | 'interested'
  | 'preparing'
  | 'applied'
  | 'assessment'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';
export type CareerMilestoneStatus = 'not-started' | 'in-progress' | 'completed';
export type EvidenceType =
  'project' | 'exercise' | 'lesson' | 'write-up' | 'presentation' | 'other';

export type CareerSkillDefinition = {
  id: string;
  name: string;
  category: string;
  lessonId?: string;
  projectId?: ProjectId;
};

export type CareerSkill = {
  skillId: string;
  status: CareerSkillStatus;
  notes: string;
  evidence: string;
};

export type CareerProfile = {
  targetRole: string;
  careerFocus: string;
  targetInternshipDate: string;
  notes: string;
};

export type PortfolioEvidence = {
  id: string;
  title: string;
  skillId: string;
  projectId?: ProjectId;
  type: EvidenceType;
  description: string;
  link: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type CareerOpportunity = {
  id: string;
  company: string;
  role: string;
  location: string;
  applicationLink: string;
  deadline: string;
  applicationDate: string;
  status: ApplicationStatus;
  notes: string;
  followUpDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CareerMilestone = {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: CareerMilestoneStatus;
  skillId?: string;
  projectId?: ProjectId;
  createdAt: string;
  updatedAt: string;
};

export type CareerWorkspaceData = {
  profile: CareerProfile;
  skills: CareerSkill[];
  evidence: PortfolioEvidence[];
  opportunities: CareerOpportunity[];
  milestones: CareerMilestone[];
};

export const CAREER_STORAGE_KEY = 'los-career' as const;

export const CAREER_SKILLS: readonly CareerSkillDefinition[] = [
  { id: 'python', name: 'Python', category: 'Programming', lessonId: 'py-1', projectId: 'P0' },
  { id: 'sql', name: 'SQL', category: 'Programming', lessonId: 'py-4', projectId: 'P1' },
  { id: 'bash', name: 'Bash', category: 'Programming', lessonId: 'py-3' },
  { id: 'git', name: 'Git', category: 'Programming', lessonId: 'py-3' },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Computer Science',
  },
  { id: 'linux', name: 'Linux', category: 'Computer Science', lessonId: 'py-3' },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    category: 'Computer Science',
    lessonId: 'sys-1',
  },
  { id: 'networking', name: 'Networking', category: 'Computer Science', lessonId: 'sys-1' },
  { id: 'linear-algebra', name: 'Linear Algebra', category: 'Mathematics', lessonId: 'math-2' },
  { id: 'probability', name: 'Probability', category: 'Mathematics', lessonId: 'math-4' },
  { id: 'statistics', name: 'Statistics', category: 'Mathematics', lessonId: 'math-4' },
  { id: 'optimization', name: 'Optimization', category: 'Mathematics', lessonId: 'math-3' },
  {
    id: 'classical-ml',
    name: 'Classical ML',
    category: 'Machine Learning',
    lessonId: 'ml-2',
    projectId: 'P2',
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'Machine Learning',
    lessonId: 'dl-2',
    projectId: 'P3',
  },
  {
    id: 'model-evaluation',
    name: 'Model Evaluation',
    category: 'Machine Learning',
    lessonId: 'ml-2',
    projectId: 'P2',
  },
  {
    id: 'data-pipelines',
    name: 'Data Pipelines',
    category: 'ML Systems',
    lessonId: 'ml-1',
    projectId: 'P1',
  },
  {
    id: 'model-serving',
    name: 'Model Serving',
    category: 'ML Systems',
    lessonId: 'ops-2',
    projectId: 'P4',
  },
  { id: 'apis', name: 'APIs', category: 'ML Systems', lessonId: 'ops-2', projectId: 'P4' },
  { id: 'docker', name: 'Docker', category: 'ML Systems', lessonId: 'ops-2', projectId: 'P4' },
  { id: 'ci-cd', name: 'CI/CD', category: 'ML Systems', lessonId: 'ops-3', projectId: 'P5' },
  {
    id: 'monitoring',
    name: 'Monitoring',
    category: 'ML Systems',
    lessonId: 'ops-3',
    projectId: 'P5',
  },
  { id: 'cloud', name: 'Cloud', category: 'Infrastructure', lessonId: 'ops-4', projectId: 'P5' },
  {
    id: 'distributed-systems',
    name: 'Distributed Systems',
    category: 'Infrastructure',
    lessonId: 'sys-3',
    projectId: 'P5',
  },
  {
    id: 'inference-optimization',
    name: 'Inference Optimization',
    category: 'Infrastructure',
    lessonId: 'inf-5',
    projectId: 'P6',
  },
];

export const APPLICATION_STATUSES: readonly ApplicationStatus[] = [
  'interested',
  'preparing',
  'applied',
  'assessment',
  'interview',
  'offer',
  'rejected',
  'withdrawn',
];
export const CAREER_SKILL_STATUSES: readonly CareerSkillStatus[] = [
  'not-started',
  'learning',
  'practicing',
  'demonstrated',
];
export const CAREER_MILESTONE_STATUSES: readonly CareerMilestoneStatus[] = [
  'not-started',
  'in-progress',
  'completed',
];
export const EVIDENCE_TYPES: readonly EvidenceType[] = [
  'project',
  'exercise',
  'lesson',
  'write-up',
  'presentation',
  'other',
];

const skillIds = new Set(CAREER_SKILLS.map((skill) => skill.id));
const projectIds = new Set<string>(PROJECT_LADDER.map((project) => project.id));
const lessonIds = new Set(
  curriculumOutline.flatMap((stage) => stage.lessons.map((lesson) => lesson.id)),
);
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string => typeof value === 'string';
const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.trim().length > 0;
const isOptionalDate = (value: unknown): value is string =>
  isString(value) && (value === '' || isDate(value));
const isDate = (value: unknown): value is string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
  const [year, month, day] = String(value).split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const isTimestamp = (value: unknown): value is string =>
  isNonEmptyString(value) && Number.isFinite(Date.parse(value));
const oneOf = <T extends string>(values: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && values.some((item) => item === value);
const validProjectId = (value: unknown): value is ProjectId =>
  typeof value === 'string' && projectIds.has(value);
const validOptionalProjectId = (record: Record<string, unknown>, key: string) =>
  !(key in record) || validProjectId(record[key]);
const isOptionalWebUrl = (value: unknown) => {
  if (!isString(value)) return false;
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export const emptyCareerWorkspace = (): CareerWorkspaceData => ({
  profile: { targetRole: '', careerFocus: '', targetInternshipDate: '', notes: '' },
  skills: CAREER_SKILLS.map((skill) => ({
    skillId: skill.id,
    status: 'not-started',
    notes: '',
    evidence: '',
  })),
  evidence: [],
  opportunities: [],
  milestones: [],
});

export function isCareerWorkspaceData(value: unknown): value is CareerWorkspaceData {
  if (
    !isRecord(value) ||
    !isRecord(value.profile) ||
    !isString(value.profile.targetRole) ||
    !isString(value.profile.careerFocus) ||
    !isOptionalDate(value.profile.targetInternshipDate) ||
    !isString(value.profile.notes) ||
    !Array.isArray(value.skills) ||
    !Array.isArray(value.evidence) ||
    !Array.isArray(value.opportunities) ||
    !Array.isArray(value.milestones)
  ) {
    return false;
  }
  const evidenceRecords = value.evidence;
  const evidenceValid = evidenceRecords.every(
    (item) =>
      isRecord(item) &&
      isNonEmptyString(item.id) &&
      isNonEmptyString(item.title) &&
      skillIds.has(String(item.skillId)) &&
      validOptionalProjectId(item, 'projectId') &&
      oneOf(EVIDENCE_TYPES, item.type) &&
      isString(item.description) &&
      isOptionalWebUrl(item.link) &&
      isDate(item.date) &&
      isTimestamp(item.createdAt) &&
      isTimestamp(item.updatedAt),
  );
  const opportunitiesValid = value.opportunities.every(
    (item) =>
      isRecord(item) &&
      isNonEmptyString(item.id) &&
      isNonEmptyString(item.company) &&
      isNonEmptyString(item.role) &&
      isString(item.location) &&
      isOptionalWebUrl(item.applicationLink) &&
      isOptionalDate(item.deadline) &&
      isOptionalDate(item.applicationDate) &&
      oneOf(APPLICATION_STATUSES, item.status) &&
      isString(item.notes) &&
      isOptionalDate(item.followUpDate) &&
      isTimestamp(item.createdAt) &&
      isTimestamp(item.updatedAt),
  );
  const skillsValid = value.skills.every(
    (skill) =>
      isRecord(skill) &&
      skillIds.has(String(skill.skillId)) &&
      oneOf(CAREER_SKILL_STATUSES, skill.status) &&
      isString(skill.notes) &&
      isString(skill.evidence) &&
      (skill.status !== 'demonstrated' ||
        skill.evidence.trim().length > 0 ||
        evidenceRecords.some((item) => isRecord(item) && item.skillId === skill.skillId)),
  );
  const milestonesValid = value.milestones.every(
    (item) =>
      isRecord(item) &&
      isNonEmptyString(item.id) &&
      isNonEmptyString(item.title) &&
      isString(item.description) &&
      isOptionalDate(item.targetDate) &&
      oneOf(CAREER_MILESTONE_STATUSES, item.status) &&
      (!('skillId' in item) || (isString(item.skillId) && skillIds.has(item.skillId))) &&
      validOptionalProjectId(item, 'projectId') &&
      isTimestamp(item.createdAt) &&
      isTimestamp(item.updatedAt),
  );
  const uniqueIds = (collection: unknown[]) =>
    new Set(collection.map((item) => (isRecord(item) ? item.id : undefined))).size ===
    collection.length;
  return (
    skillsValid &&
    value.skills.length === CAREER_SKILLS.length &&
    new Set(value.skills.map((skill) => (isRecord(skill) ? skill.skillId : undefined))).size ===
      value.skills.length &&
    evidenceValid &&
    opportunitiesValid &&
    milestonesValid &&
    uniqueIds(value.evidence) &&
    uniqueIds(value.opportunities) &&
    uniqueIds(value.milestones)
  );
}

export const loadCareerWorkspace = (): LoadResult<CareerWorkspaceData> =>
  loadRecord(CAREER_STORAGE_KEY, emptyCareerWorkspace(), isCareerWorkspaceData);

export const saveCareerWorkspace = (value: CareerWorkspaceData): SaveResult =>
  saveRecord(CAREER_STORAGE_KEY, value, isCareerWorkspaceData);

export function isCareerSkillLesson(id: string): boolean {
  return lessonIds.has(id);
}
