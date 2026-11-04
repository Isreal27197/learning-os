import { useMemo, useState } from 'react';
import { BookOpen, Clock3, FolderKanban, Play, RotateCcw } from 'lucide-react';
import type { CurriculumStage, Lesson, LessonMiniBuild } from '../data';
import type {
  ExerciseAttempt,
  ExerciseAttemptStatus,
  LearningCheckpoint,
  UnderstandingStatus,
} from '../lib/learningRecords';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';

type LabFilter = 'all' | 'not-started' | 'in-progress' | 'completed' | 'needs-review';
type Activity = {
  id: string;
  type: 'exercise' | 'mini-build';
  lesson: Lesson;
  stage: CurriculumStage;
  title: string;
  description: string;
  latestAttempt?: ExerciseAttempt;
  attempts: ExerciseAttempt[];
  relatedProjectIds: ProjectId[];
  miniBuild?: LessonMiniBuild;
};

const filters: { id: LabFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'not-started', label: 'Not started' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'needs-review', label: 'Needs review' },
];

function activityStatus(activity: Activity): ExerciseAttemptStatus {
  return activity.latestAttempt?.status ?? 'not-started';
}

function latestByExercise(attempts: ExerciseAttempt[]) {
  const latest = new Map<string, ExerciseAttempt>();
  for (const attempt of [...attempts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))) {
    if (!latest.has(`${attempt.lessonId}:${attempt.exerciseId}`)) {
      latest.set(`${attempt.lessonId}:${attempt.exerciseId}`, attempt);
    }
  }
  return latest;
}

function checkpointLabel(status: UnderstandingStatus) {
  if (status === 'needs-practice') return 'Needs practice';
  return status === 'stuck' ? 'Stuck' : 'Understood';
}

export default function LabWorkspacePage({
  stages,
  attempts,
  checkpoints,
  attemptStorageError,
  checkpointStorageError,
  onOpenActivity,
  onOpenCheckpoint,
  onOpenProject,
  onOpenClock,
}: {
  stages: CurriculumStage[];
  attempts: ExerciseAttempt[];
  checkpoints: LearningCheckpoint[];
  attemptStorageError?: string;
  checkpointStorageError?: string;
  onOpenActivity: (lessonId: string, activityId: string, attemptId?: string) => void;
  onOpenCheckpoint: (lessonId: string, checkpointId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenClock: (topic?: string) => void;
}) {
  const [filter, setFilter] = useState<LabFilter>('all');
  const latestAttempts = useMemo(() => latestByExercise(attempts), [attempts]);
  const activities = useMemo<Activity[]>(
    () =>
      stages.flatMap((stage) =>
        stage.lessons.flatMap((lesson) => {
          const projects = (lesson.relatedProjectIds ?? []).filter((id): id is ProjectId =>
            PROJECT_LADDER.some((project) => project.id === id),
          );
          const exercises: Activity[] = (lesson.exercises ?? []).map((exercise) => {
            const matchingAttempts = attempts.filter(
              (attempt) => attempt.lessonId === lesson.id && attempt.exerciseId === exercise.id,
            );
            return {
              id: exercise.id,
              type: 'exercise',
              lesson,
              stage,
              title: exercise.title,
              description: exercise.instructions,
              latestAttempt: latestAttempts.get(`${lesson.id}:${exercise.id}`),
              attempts: matchingAttempts,
              relatedProjectIds: projects,
            };
          });
          const miniBuild: Activity[] = lesson.miniBuild
            ? [
                {
                  id: 'mini-build',
                  type: 'mini-build',
                  lesson,
                  stage,
                  title: lesson.miniBuild.title,
                  description: lesson.miniBuild.goal,
                  attempts: [],
                  relatedProjectIds: projects,
                  miniBuild: lesson.miniBuild,
                },
              ]
            : [];
          return [...exercises, ...miniBuild];
        }),
      ),
    [attempts, latestAttempts, stages],
  );
  const exercises = activities.filter((activity) => activity.type === 'exercise');
  const filteredActivities = activities.filter((activity) => {
    if (filter === 'all') return true;
    if (activity.type === 'mini-build') return filter === 'not-started';
    return activityStatus(activity) === filter;
  });
  const attemptedExerciseKeys = new Set(
    attempts.map((attempt) => `${attempt.lessonId}:${attempt.exerciseId}`),
  );
  const completedExercises = exercises.filter(
    (activity) => activityStatus(activity) === 'completed',
  ).length;
  const lessonsWithPracticalWork = stages
    .flatMap((stage) => stage.lessons)
    .filter((lesson) => Boolean(lesson.exercises?.length || lesson.miniBuild)).length;
  const resumableAttempts = [...latestAttempts.values()]
    .filter((attempt) => attempt.status === 'in-progress' || attempt.status === 'needs-review')
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const savedCheckpoints = [...checkpoints].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const openAttempt = (attempt: ExerciseAttempt) =>
    onOpenActivity(attempt.lessonId, attempt.exerciseId, attempt.id);
  const openCheckpoint = (checkpoint: LearningCheckpoint) =>
    onOpenCheckpoint(checkpoint.lessonId, checkpoint.id);

  return (
    <div className="lab-workspace">
      <section className="panel lab-intro">
        <div>
          <div className="eyebrow">PRACTICE · EXPERIMENT · REFLECT</div>
          <h2>Turn what you study into work you can inspect.</h2>
          <p>
            Find authored exercises and mini-builds, resume saved drafts, and review learning
            checkpoints. Your code is stored as text; Lab does not execute or grade it.
          </p>
        </div>
        <button className="primary" type="button" onClick={() => onOpenClock()}>
          <Clock3 size={16} /> Open Study Clock
        </button>
      </section>

      {(attemptStorageError || checkpointStorageError) && (
        <section className="lab-warnings">
          {attemptStorageError && <p role="alert">Exercise attempts: {attemptStorageError}</p>}
          {checkpointStorageError && (
            <p role="alert">Learning checkpoints: {checkpointStorageError}</p>
          )}
        </section>
      )}

      <section className="lab-metrics" aria-label="Practical work overview">
        <Metric label="Available exercises" value={String(exercises.length)} />
        <Metric label="Exercises with saved attempts" value={String(attemptedExerciseKeys.size)} />
        <Metric label="Latest attempts completed" value={String(completedExercises)} />
        <Metric label="Lessons with practical work" value={String(lessonsWithPracticalWork)} />
      </section>

      <section className="panel lab-resume">
        <div className="lab-section-heading">
          <div>
            <div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div>
            <h2>Resume current work</h2>
          </div>
          <span className="lab-count">{resumableAttempts.length} active or review</span>
        </div>
        {resumableAttempts.length ? (
          <ul className="lab-resume-list">
            {resumableAttempts.map((attempt) => {
              const lesson = stages
                .flatMap((stage) => stage.lessons)
                .find((item) => item.id === attempt.lessonId);
              return (
                <li key={attempt.id}>
                  <span>
                    <b>{attempt.title}</b>
                    <small>
                      {lesson?.title ?? attempt.lessonId} · {attempt.status.replace('-', ' ')} ·
                      updated {new Date(attempt.updatedAt).toLocaleString()}
                    </small>
                  </span>
                  <button className="outline" type="button" onClick={() => openAttempt(attempt)}>
                    <RotateCcw size={14} /> Resume draft
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="muted">No saved exercise drafts or attempts needing review yet.</p>
        )}
      </section>

      <section className="panel lab-catalogue">
        <div className="lab-section-heading">
          <div>
            <div className="eyebrow">CURRICULUM PRACTICE</div>
            <h2>Practical work catalogue</h2>
          </div>
          <span className="lab-count">{filteredActivities.length} activities</span>
        </div>
        <div className="lab-filters" role="group" aria-label="Filter practical work">
          {filters.map((item) => (
            <button
              key={item.id}
              className={filter === item.id ? 'lab-filter active' : 'lab-filter'}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {filteredActivities.length ? (
          <div className="lab-activity-grid">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={`${activity.lesson.id}:${activity.id}`}
                activity={activity}
                onOpen={() =>
                  onOpenActivity(
                    activity.lesson.id,
                    activity.type === 'mini-build' ? 'mini-build' : activity.id,
                    activity.latestAttempt?.id,
                  )
                }
                onOpenClock={() => onOpenClock(activity.lesson.title)}
                onOpenProject={onOpenProject}
              />
            ))}
          </div>
        ) : (
          <p className="muted lab-empty">No activities match this status.</p>
        )}
        {filter === 'not-started' && activities.some((item) => item.type === 'mini-build') && (
          <p className="lab-note">
            Mini-build progress is not persisted by the current record model, so these cards show
            the authored build without claiming whether you have started it.
          </p>
        )}
      </section>

      <section className="panel lab-checkpoints">
        <div className="lab-section-heading">
          <div>
            <div className="eyebrow">UNDERSTANDING CHECKPOINTS</div>
            <h2>Where to revisit</h2>
          </div>
          <span className="lab-count">{savedCheckpoints.length} saved</span>
        </div>
        {savedCheckpoints.length ? (
          <div className="lab-checkpoint-grid">
            {savedCheckpoints.map((checkpoint) => {
              const lesson = stages
                .flatMap((stage) => stage.lessons)
                .find((item) => item.id === checkpoint.lessonId);
              return (
                <article className={`lab-checkpoint ${checkpoint.status}`} key={checkpoint.id}>
                  <div className="lab-status">{checkpointLabel(checkpoint.status)}</div>
                  <h3>{checkpoint.title.replace(/^(Concept|Objective): /, '')}</h3>
                  <p>{lesson?.title ?? checkpoint.lessonId}</p>
                  {checkpoint.reflection && <blockquote>{checkpoint.reflection}</blockquote>}
                  <button
                    className="textbtn"
                    type="button"
                    onClick={() => openCheckpoint(checkpoint)}
                  >
                    <BookOpen size={14} /> Review checkpoint
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="muted">Saved learning checkpoints will appear here.</p>
        )}
      </section>

      <section className="panel lab-projects">
        <div className="lab-section-heading">
          <div>
            <div className="eyebrow">PROJECT LADDER</div>
            <h2>Connect practice to projects</h2>
          </div>
        </div>
        <div className="lab-project-grid">
          {PROJECT_LADDER.map((project) => (
            <article key={project.id}>
              <span>{project.id}</span>
              <div>
                <b>{project.title}</b>
                <small>{project.status}</small>
              </div>
              <button
                className="textbtn"
                type="button"
                aria-label={`Open ${project.id} ${project.title} project`}
                onClick={() => onOpenProject(project.id)}
              >
                <FolderKanban size={14} /> Open
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="lab-metric">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function ActivityCard({
  activity,
  onOpen,
  onOpenClock,
  onOpenProject,
}: {
  activity: Activity;
  onOpen: () => void;
  onOpenClock: () => void;
  onOpenProject: (projectId: ProjectId) => void;
}) {
  const status = activityStatus(activity);
  const statusLabel =
    activity.type === 'mini-build' ? 'Progress not tracked' : status.replace('-', ' ');
  const relatedProjects = activity.relatedProjectIds;
  return (
    <article className="lab-activity-card">
      <div className="lab-card-topline">
        <span className="lab-activity-type">
          {activity.type === 'exercise' ? 'Exercise' : 'Mini-build'}
        </span>
        <span className={`lab-status ${status}`}>{statusLabel}</span>
      </div>
      <h3>{activity.title}</h3>
      <div className="lab-related">
        <span>{activity.stage.name}</span>
        <span>·</span>
        <span>{activity.lesson.title}</span>
      </div>
      <p>{activity.description}</p>
      {activity.type === 'exercise' ? (
        <small className="lab-attempt-meta">
          {activity.attempts.length
            ? `${activity.attempts.length} saved ${activity.attempts.length === 1 ? 'attempt' : 'attempts'} · latest ${status.replace('-', ' ')}`
            : 'No saved attempt'}
        </small>
      ) : (
        <small className="lab-attempt-meta">
          Authored requirements and milestones · attempt tracking is not available
        </small>
      )}
      {relatedProjects.length > 0 && (
        <div className="lab-related-projects">
          {relatedProjects.map((projectId) => (
            <button
              className="textbtn"
              type="button"
              key={projectId}
              onClick={() => onOpenProject(projectId)}
            >
              <FolderKanban size={13} /> {projectId}
            </button>
          ))}
        </div>
      )}
      <div className="lab-card-actions">
        <button className="primary compact" type="button" onClick={onOpen}>
          <BookOpen size={14} /> {activity.latestAttempt ? 'Resume workspace' : 'Open lesson'}
        </button>
        <button className="textbtn" type="button" onClick={onOpenClock}>
          <Play size={14} /> Study Clock
        </button>
      </div>
    </article>
  );
}
