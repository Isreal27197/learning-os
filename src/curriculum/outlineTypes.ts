export type CurriculumOutlineExercise = {
  id: string;
  title: string;
};

export type CurriculumOutlineLesson = {
  id: string;
  title: string;
  detail: string;
  status: 'current' | 'next' | 'later';
  category: string;
  conceptIds: readonly string[];
  exercises: readonly CurriculumOutlineExercise[];
};

export type CurriculumOutlineStage = {
  id: string;
  name: string;
  tag: string;
  description: string;
  lessons: readonly CurriculumOutlineLesson[];
};
