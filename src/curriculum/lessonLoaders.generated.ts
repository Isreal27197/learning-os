// GENERATED, DO NOT EDIT. Run `npm run generate:outline` to regenerate.
import type { LessonContent } from './lessonTypes';

export const lessonLoaders = {
  'py-1': () => import('../lessons/py-1'),
  'py-2': () => import('../lessons/py-2'),
  'py-3': () => import('../lessons/py-3'),
  'py-4': () => import('../lessons/py-4'),
  'math-1': () => import('../lessons/math-1'),
  'math-2': () => import('../lessons/math-2'),
  'math-3': () => import('../lessons/math-3'),
} satisfies Record<string, () => Promise<{ content: LessonContent }>>;
