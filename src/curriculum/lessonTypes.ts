import type { Lesson } from '../data';

export type LessonMetadata = Pick<Lesson, 'id' | 'title' | 'detail' | 'status' | 'category'>;
export type LessonContent = Omit<Lesson, keyof LessonMetadata>;
