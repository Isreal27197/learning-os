import { curriculumOutline } from '../curriculum/outline.generated';

type ProgressStage = { lessons: readonly { id: string }[] };

export type StageProgress = {
  completedCount: number;
  totalCount: number;
  percentage: number;
};

export type LearningProgress = {
  completedIds: string[];
  completedCount: number;
  totalCount: number;
  percentage: number;
  stages: StageProgress[];
};

export function calculateLearningProgress(
  stages: readonly ProgressStage[],
  completionRecords: unknown,
): LearningProgress {
  const validLessonIds = new Set(
    stages.flatMap((stage) => stage.lessons.map((lesson) => lesson.id)),
  );
  const completedIds = new Set(
    Array.isArray(completionRecords)
      ? completionRecords.filter(
          (id): id is string => typeof id === 'string' && validLessonIds.has(id),
        )
      : [],
  );

  const stageProgress = stages.map(({ lessons }) => {
    const totalCount = lessons.length;
    const completedCount = lessons.filter((lesson) => completedIds.has(lesson.id)).length;

    return {
      completedCount,
      totalCount,
      percentage:
        totalCount === 0 ? 0 : Math.min(100, Math.round((completedCount / totalCount) * 100)),
    };
  });
  const totalCount = stageProgress.reduce((total, stage) => total + stage.totalCount, 0);
  const completedCount = stageProgress.reduce((total, stage) => total + stage.completedCount, 0);

  return {
    completedIds: [...completedIds],
    completedCount,
    totalCount,
    percentage:
      totalCount === 0 ? 0 : Math.min(100, Math.round((completedCount / totalCount) * 100)),
    stages: stageProgress,
  };
}
