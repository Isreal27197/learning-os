export type PageView =
  | 'dashboard'
  | 'roadmap'
  | 'week'
  | 'daily'
  | 'placeholder'
  | 'diary'
  | 'studio'
  | 'career'
  | 'library'
  | 'tools'
  | 'projects'
  | 'analytics'
  | 'lessonDetail'
  | 'studyClock'
  | 'account';

type PageDefinition = {
  label: string;
  title: string;
  view: PageView;
  description?: string;
};

export const PAGE_DEFINITIONS = {
  dashboard: { label: 'Dashboard', title: 'Dashboard', view: 'dashboard' },
  roadmap: { label: 'Roadmap', title: 'Roadmap', view: 'roadmap' },
  week: {
    label: 'Week',
    title: 'Week',
    view: 'week',
    description: 'Plan the week, choose daily focus, and review what you actually completed.',
  },
  daily: { label: 'Daily', title: 'Daily', view: 'daily' },
  lab: { label: 'Lab', title: 'Lab', view: 'studio' },
  projects: { label: 'Projects', title: 'Projects', view: 'projects' },
  career: { label: 'Career', title: 'Career', view: 'career' },
  library: { label: 'Library', title: 'Library', view: 'library' },
  tools: { label: 'Tools', title: 'Tools', view: 'tools' },
  startup: {
    label: 'Startup',
    title: 'Startup',
    view: 'placeholder',
    description: 'Explore AI and ML infrastructure ideas, product experiments, and opportunities.',
  },
  data: {
    label: 'Data',
    title: 'Data',
    view: 'placeholder',
    description: 'Export your local learning data here. Import and restore are not available yet.',
  },
  analytics: { label: 'Analytics', title: 'Analytics', view: 'analytics' },
  lessonDetail: { label: 'Lesson', title: 'Lesson', view: 'lessonDetail' },
  studyClock: { label: 'Study Clock', title: 'Study Clock', view: 'studyClock' },
  account: { label: 'Account', title: 'Account', view: 'account' },
} as const satisfies Record<string, PageDefinition>;

export type PageId = keyof typeof PAGE_DEFINITIONS;
export type MainNavigationId = (typeof MAIN_NAVIGATION)[number];

export const MAIN_NAVIGATION = [
  'dashboard',
  'roadmap',
  'week',
  'daily',
  'lab',
  'projects',
  'career',
  'library',
  'tools',
  'startup',
  'data',
] as const satisfies readonly PageId[];
