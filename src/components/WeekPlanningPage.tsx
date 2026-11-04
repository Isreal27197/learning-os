import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock3, FolderKanban, Plus, Save } from 'lucide-react';
import { curriculumOutline } from '../curriculum/outline.generated';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';
import {
  addLocalDays,
  formatLocalDate,
  getMonday,
  getWeekDates,
  WEEKLY_TASK_PRIORITIES,
  WEEKLY_TASK_STATUSES,
  type WeeklyOutcome,
  type WeeklyPlan,
  type WeeklyTask,
  type WeeklyTaskPriority,
  type WeeklyTaskStatus,
} from '../lib/weeklyPlanning';
import type { SaveResult } from '../lib/storage';

type WeekPlanningPageProps = {
  plans: WeeklyPlan[];
  canSave: boolean;
  storageError?: string;
  onSave: (plans: WeeklyPlan[]) => SaveResult;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenClock: (topic: string) => void;
};

type TaskDraft = {
  id?: string;
  title: string;
  description: string;
  plannedDate: string;
  estimatedMinutes: string;
  priority: WeeklyTaskPriority;
  status: WeeklyTaskStatus;
  lessonId: string;
  projectId: ProjectId | '';
};

const emptyReview = {
  whatWentWell: '',
  difficulties: '',
  lessonsLearned: '',
  nextPriorities: '',
};

function localDateLabel(value: string, options: Intl.DateTimeFormatOptions = {}) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    ...options,
  });
}

function createTaskDraft(plannedDate: string): TaskDraft {
  return {
    title: '',
    description: '',
    plannedDate,
    estimatedMinutes: '',
    priority: 'medium',
    status: 'planned',
    lessonId: '',
    projectId: '',
  };
}

export default function WeekPlanningPage({
  plans,
  canSave,
  storageError,
  onSave,
  onOpenLesson,
  onOpenProject,
  onOpenClock,
}: WeekPlanningPageProps) {
  const [weekStart, setWeekStart] = useState(() => formatLocalDate(getMonday(new Date())));
  const [focusDraft, setFocusDraft] = useState('');
  const [outcomeDraft, setOutcomeDraft] = useState('');
  const [outcomeEdits, setOutcomeEdits] = useState<Record<string, string>>({});
  const [taskDraft, setTaskDraft] = useState<TaskDraft | null>(null);
  const [reviewDraft, setReviewDraft] = useState(emptyReview);
  const [feedback, setFeedback] = useState('');

  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);
  const plan = plans.find((item) => item.startDate === weekStart);
  const today = formatLocalDate(new Date());
  const todayInWeek = weekDates.includes(today);
  const todayTasks = (plan?.tasks ?? []).filter((task) => task.plannedDate === today);

  useEffect(() => {
    setFocusDraft(plan?.focus ?? '');
    setOutcomeDraft('');
    setOutcomeEdits({});
    setTaskDraft(null);
    setReviewDraft(plan?.review ?? emptyReview);
    setFeedback('');
  }, [weekStart, plan?.id]);

  const persistPlan = (updated: WeeklyPlan, message: string): SaveResult => {
    if (!canSave) return { ok: false, error: 'Weekly-plan storage is unavailable or invalid.' };
    const next = plan
      ? plans.map((item) => (item.id === plan.id ? updated : item))
      : [...plans, updated];
    const result = onSave(next);
    setFeedback(result.ok ? message : `Could not save weekly plan: ${result.error}`);
    return result;
  };

  const updatePlan = (
    update: (current: WeeklyPlan) => WeeklyPlan,
    message: string,
  ): SaveResult | undefined => {
    if (!plan || !canSave) return undefined;
    return persistPlan({ ...update(plan), updatedAt: new Date().toISOString() }, message);
  };

  const createPlan = () => {
    if (!canSave || plan || weekDates.length !== 7) return;
    const now = new Date().toISOString();
    const created: WeeklyPlan = {
      id: `week-${weekStart}`,
      startDate: weekStart,
      endDate: weekDates[6],
      focus: focusDraft.trim(),
      outcomes: [],
      tasks: [],
      review: { ...emptyReview },
      createdAt: now,
      updatedAt: now,
    };
    const result = onSave([...plans, created]);
    setFeedback(
      result.ok ? 'Weekly plan created.' : `Could not create weekly plan: ${result.error}`,
    );
  };

  const saveFocus = () => {
    if (!plan) return;
    updatePlan((current) => ({ ...current, focus: focusDraft.trim() }), 'Weekly focus saved.');
  };

  const addOutcome = () => {
    if (!plan || !outcomeDraft.trim()) return;
    const outcome: WeeklyOutcome = {
      id: crypto.randomUUID(),
      title: outcomeDraft.trim(),
      completed: false,
    };
    const result = updatePlan(
      (current) => ({ ...current, outcomes: [...current.outcomes, outcome] }),
      'Outcome added.',
    );
    setOutcomeDraft('');
  };

  const editOutcome = (outcome: WeeklyOutcome) => {
    const title = outcomeEdits[outcome.id]?.trim();
    if (!title) {
      setFeedback('Outcome titles cannot be empty.');
      return;
    }
    updatePlan(
      (current) => ({
        ...current,
        outcomes: current.outcomes.map((item) =>
          item.id === outcome.id ? { ...item, title } : item,
        ),
      }),
      'Outcome updated.',
    );
  };

  const toggleOutcome = (outcomeId: string, completed: boolean) => {
    updatePlan(
      (current) => ({
        ...current,
        outcomes: current.outcomes.map((item) =>
          item.id === outcomeId ? { ...item, completed } : item,
        ),
      }),
      completed ? 'Outcome marked complete.' : 'Outcome reopened.',
    );
  };

  const saveTask = () => {
    if (!plan || !taskDraft || !taskDraft.title.trim()) {
      setFeedback('Enter a task title before saving.');
      return;
    }
    if (
      taskDraft.estimatedMinutes &&
      (!Number.isFinite(Number(taskDraft.estimatedMinutes)) ||
        Number(taskDraft.estimatedMinutes) <= 0)
    ) {
      setFeedback('Estimated duration must be a positive number of minutes.');
      return;
    }
    const now = new Date().toISOString();
    const existing = taskDraft.id ? plan.tasks.find((item) => item.id === taskDraft.id) : undefined;
    const task: WeeklyTask = {
      id: existing?.id ?? crypto.randomUUID(),
      title: taskDraft.title.trim(),
      ...(taskDraft.description.trim() ? { description: taskDraft.description.trim() } : {}),
      plannedDate: taskDraft.plannedDate,
      ...(taskDraft.estimatedMinutes
        ? { estimatedMinutes: Number(taskDraft.estimatedMinutes) }
        : {}),
      priority: taskDraft.priority,
      status: taskDraft.status,
      ...(taskDraft.lessonId ? { lessonId: taskDraft.lessonId } : {}),
      ...(taskDraft.projectId ? { projectId: taskDraft.projectId } : {}),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const result = updatePlan(
      (current) => {
        const { dailyFocusTaskIds: storedFocuses, ...planWithoutFocuses } = current;
        const dailyFocusTaskIds = { ...storedFocuses };
        if (
          existing &&
          existing.plannedDate !== task.plannedDate &&
          dailyFocusTaskIds[existing.plannedDate] === existing.id
        ) {
          delete dailyFocusTaskIds[existing.plannedDate];
          dailyFocusTaskIds[task.plannedDate] = task.id;
        }
        return {
          ...planWithoutFocuses,
          ...(Object.keys(dailyFocusTaskIds).length ? { dailyFocusTaskIds } : {}),
          tasks: existing
            ? current.tasks.map((item) => (item.id === existing.id ? task : item))
            : [...current.tasks, task],
        };
      },
      existing ? 'Task updated.' : 'Task added to the week.',
    );
    if (result?.ok) setTaskDraft(null);
  };

  const updateTaskStatus = (taskId: string, status: WeeklyTaskStatus) => {
    updatePlan(
      (current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task,
        ),
      }),
      'Task status saved.',
    );
  };

  const saveReview = () => {
    updatePlan((current) => ({ ...current, review: { ...reviewDraft } }), 'Weekly review saved.');
  };

  const shiftWeek = (days: number) => {
    const [year, month, day] = weekStart.split('-').map(Number);
    setWeekStart(formatLocalDate(addLocalDays(new Date(year, month - 1, day), days)));
  };

  return (
    <div className="week-workspace">
      <section className="panel week-header">
        <div className="week-navigation">
          <button className="outline" type="button" onClick={() => shiftWeek(-7)}>
            <ArrowLeft size={15} /> Previous week
          </button>
          <div className="week-range">
            <div className="eyebrow">
              {weekStart === formatLocalDate(getMonday(new Date())) ? 'CURRENT WEEK' : 'WEEK PLAN'}
            </div>
            <h2>
              {weekDates.length
                ? `${localDateLabel(weekDates[0], { year: undefined })} – ${localDateLabel(weekDates[6], { year: undefined })}`
                : weekStart}
            </h2>
          </div>
          <button className="outline" type="button" onClick={() => shiftWeek(7)}>
            Next week <ArrowRight size={15} />
          </button>
        </div>
        {weekStart !== formatLocalDate(getMonday(new Date())) && (
          <button
            className="textbtn week-current-link"
            type="button"
            onClick={() => setWeekStart(formatLocalDate(getMonday(new Date())))}
          >
            Go to current week
          </button>
        )}
      </section>

      {storageError && (
        <p className="weekly-storage-warning" role="alert">
          {storageError}
        </p>
      )}
      {feedback && (
        <p className="weekly-feedback" role="status">
          {feedback}
        </p>
      )}

      {!plan ? (
        <section className="panel week-create">
          <div className="eyebrow">PLAN YOUR WEEK</div>
          <h2>No plan for this week yet</h2>
          <p>Start with a focus, then add a small number of outcomes and day-by-day tasks.</p>
          <label>
            Weekly theme or focus
            <input
              value={focusDraft}
              disabled={!canSave}
              onChange={(event) => setFocusDraft(event.target.value)}
              placeholder="For example: Finish Python file-handling practice"
            />
          </label>
          <button className="primary" type="button" disabled={!canSave} onClick={createPlan}>
            <Plus size={16} /> Create weekly plan
          </button>
        </section>
      ) : (
        <>
          <section className="panel week-focus">
            <div className="week-section-heading">
              <div>
                <div className="eyebrow">THIS WEEK'S FOCUS</div>
                <h2>{plan.focus || 'Set a clear weekly focus'}</h2>
              </div>
              <span className="week-record-range">
                {plan.startDate} – {plan.endDate}
              </span>
            </div>
            <label>
              Weekly theme or focus
              <input
                value={focusDraft}
                disabled={!canSave}
                onChange={(event) => setFocusDraft(event.target.value)}
                placeholder="What is the main thing you want to move forward?"
              />
            </label>
            <button className="outline" type="button" disabled={!canSave} onClick={saveFocus}>
              <Save size={14} /> Save focus
            </button>
          </section>

          <section className="panel week-section">
            <div className="week-section-heading">
              <div>
                <div className="eyebrow">MEASURABLE OUTCOMES</div>
                <h2>What would make this week useful?</h2>
              </div>
              <span className="week-count">
                {plan.outcomes.filter((item) => item.completed).length}/{plan.outcomes.length}{' '}
                complete
              </span>
            </div>
            <form
              className="week-inline-form"
              onSubmit={(event) => {
                event.preventDefault();
                addOutcome();
              }}
            >
              <label className="visually-hidden" htmlFor="weekly-outcome">
                Add a weekly outcome
              </label>
              <input
                id="weekly-outcome"
                value={outcomeDraft}
                disabled={!canSave}
                onChange={(event) => setOutcomeDraft(event.target.value)}
                placeholder="Add a specific outcome..."
              />
              <button
                className="primary compact"
                type="submit"
                disabled={!canSave || !outcomeDraft.trim()}
              >
                <Plus size={15} /> Add outcome
              </button>
            </form>
            {plan.outcomes.length ? (
              <ul className="weekly-outcome-list">
                {plan.outcomes.map((outcome) => (
                  <li key={outcome.id} className={outcome.completed ? 'is-complete' : ''}>
                    <input
                      type="checkbox"
                      aria-label={`Mark outcome ${outcome.title} complete`}
                      checked={outcome.completed}
                      disabled={!canSave}
                      onChange={(event) => toggleOutcome(outcome.id, event.target.checked)}
                    />
                    <input
                      aria-label="Outcome title"
                      value={outcomeEdits[outcome.id] ?? outcome.title}
                      disabled={!canSave}
                      onChange={(event) =>
                        setOutcomeEdits((current) => ({
                          ...current,
                          [outcome.id]: event.target.value,
                        }))
                      }
                    />
                    {outcomeEdits[outcome.id] !== undefined &&
                      outcomeEdits[outcome.id] !== outcome.title && (
                        <button
                          className="textbtn"
                          type="button"
                          disabled={!canSave}
                          onClick={() => editOutcome(outcome)}
                        >
                          Save edit
                        </button>
                      )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No weekly outcomes yet. Keep the list small and specific.</p>
            )}
          </section>

          <section className="panel week-section today-section">
            <div className="week-section-heading">
              <div>
                <div className="eyebrow">TODAY'S TASKS</div>
                <h2>{todayInWeek ? localDateLabel(today) : 'Today is outside this week'}</h2>
              </div>
              {todayInWeek && (
                <button
                  className="outline"
                  type="button"
                  disabled={!canSave}
                  onClick={() => setTaskDraft(createTaskDraft(today))}
                >
                  <Plus size={14} /> Add today's task
                </button>
              )}
            </div>
            {todayInWeek && todayTasks.length ? (
              <TaskList
                tasks={todayTasks}
                lessons={curriculumOutline.flatMap((stage) => stage.lessons)}
                canSave={canSave}
                onStatus={updateTaskStatus}
                onEdit={(task) =>
                  setTaskDraft({
                    id: task.id,
                    title: task.title,
                    description: task.description ?? '',
                    plannedDate: task.plannedDate,
                    estimatedMinutes: task.estimatedMinutes?.toString() ?? '',
                    priority: task.priority,
                    status: task.status,
                    lessonId: task.lessonId ?? '',
                    projectId: task.projectId ?? '',
                  })
                }
                onOpenLesson={onOpenLesson}
                onOpenProject={onOpenProject}
                onOpenClock={onOpenClock}
              />
            ) : (
              <p className="muted">
                {todayInWeek
                  ? 'No tasks planned for today.'
                  : 'Use the day overview to review tasks in this week.'}
              </p>
            )}
          </section>

          {taskDraft && (
            <TaskEditor
              draft={taskDraft}
              weekDates={weekDates}
              canSave={canSave}
              onChange={setTaskDraft}
              onSave={saveTask}
              onCancel={() => setTaskDraft(null)}
            />
          )}

          <section className="panel week-section">
            <div className="week-section-heading">
              <div>
                <div className="eyebrow">MONDAY – SUNDAY</div>
                <h2>Seven-day overview</h2>
              </div>
              <button
                className="outline"
                type="button"
                disabled={!canSave}
                onClick={() => setTaskDraft(createTaskDraft(todayInWeek ? today : weekStart))}
              >
                <Plus size={14} /> Add task
              </button>
            </div>
            <div className="week-day-grid">
              {weekDates.map((date) => {
                const dayTasks = plan.tasks.filter((task) => task.plannedDate === date);
                return (
                  <section className={date === today ? 'week-day is-today' : 'week-day'} key={date}>
                    <h3>{localDateLabel(date)}</h3>
                    <span className="week-day-date">{date === today ? 'Today' : date}</span>
                    {dayTasks.length ? (
                      <TaskList
                        tasks={dayTasks}
                        lessons={curriculumOutline.flatMap((stage) => stage.lessons)}
                        canSave={canSave}
                        onStatus={updateTaskStatus}
                        onEdit={(task) =>
                          setTaskDraft({
                            id: task.id,
                            title: task.title,
                            description: task.description ?? '',
                            plannedDate: task.plannedDate,
                            estimatedMinutes: task.estimatedMinutes?.toString() ?? '',
                            priority: task.priority,
                            status: task.status,
                            lessonId: task.lessonId ?? '',
                            projectId: task.projectId ?? '',
                          })
                        }
                        onOpenLesson={onOpenLesson}
                        onOpenProject={onOpenProject}
                        onOpenClock={onOpenClock}
                        compact
                      />
                    ) : (
                      <p className="muted week-empty-day">Nothing planned</p>
                    )}
                    <button
                      className="textbtn week-add-day"
                      type="button"
                      disabled={!canSave}
                      onClick={() => setTaskDraft(createTaskDraft(date))}
                    >
                      <Plus size={13} /> Add task
                    </button>
                  </section>
                );
              })}
            </div>
          </section>

          <section className="panel week-section">
            <div className="eyebrow">WEEKLY REVIEW</div>
            <h2>Review the week honestly</h2>
            <div className="week-review-summary">
              <div>
                <b>Planned outcomes</b>
                <small>
                  {plan.outcomes.length
                    ? plan.outcomes.map((item) => item.title).join(' · ')
                    : 'None recorded'}
                </small>
              </div>
              <div>
                <b>Completed outcomes</b>
                <small>
                  {plan.outcomes
                    .filter((item) => item.completed)
                    .map((item) => item.title)
                    .join(' · ') || 'None recorded'}
                </small>
              </div>
              <div>
                <b>Completed daily tasks</b>
                <small>
                  {plan.tasks
                    .filter((task) => task.status === 'completed')
                    .map((task) => task.title)
                    .join(' · ') || 'None recorded'}
                </small>
              </div>
              <div>
                <b>Skipped or unfinished tasks</b>
                <small>
                  {plan.tasks
                    .filter(
                      (task) =>
                        task.status === 'skipped' ||
                        task.status === 'planned' ||
                        task.status === 'in-progress',
                    )
                    .map((task) => `${task.title} (${task.status.replace('-', ' ')})`)
                    .join(' · ') || 'None recorded'}
                </small>
              </div>
            </div>
            <div className="week-review-fields">
              <label>
                What went well?
                <textarea
                  value={reviewDraft.whatWentWell}
                  disabled={!canSave}
                  onChange={(event) =>
                    setReviewDraft((current) => ({ ...current, whatWentWell: event.target.value }))
                  }
                  rows={3}
                />
              </label>
              <label>
                What was difficult?
                <textarea
                  value={reviewDraft.difficulties}
                  disabled={!canSave}
                  onChange={(event) =>
                    setReviewDraft((current) => ({ ...current, difficulties: event.target.value }))
                  }
                  rows={3}
                />
              </label>
              <label>
                What did you learn?
                <textarea
                  value={reviewDraft.lessonsLearned}
                  disabled={!canSave}
                  onChange={(event) =>
                    setReviewDraft((current) => ({
                      ...current,
                      lessonsLearned: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </label>
              <label>
                Priorities for next week
                <textarea
                  value={reviewDraft.nextPriorities}
                  disabled={!canSave}
                  onChange={(event) =>
                    setReviewDraft((current) => ({
                      ...current,
                      nextPriorities: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </label>
            </div>
            <button className="primary" type="button" disabled={!canSave} onClick={saveReview}>
              <Save size={14} /> Save weekly review
            </button>
          </section>
        </>
      )}

      <section className="panel week-section">
        <div className="eyebrow">WEEK HISTORY</div>
        <h2>Previous and upcoming plans</h2>
        {plans.length ? (
          <ul className="week-history-list">
            {[...plans]
              .sort((a, b) => b.startDate.localeCompare(a.startDate))
              .map((item) => (
                <li key={item.id}>
                  <span>
                    <b>{item.focus || 'Weekly plan'}</b>
                    <small>
                      {item.startDate} – {item.endDate} ·{' '}
                      {item.outcomes.filter((outcome) => outcome.completed).length}/
                      {item.outcomes.length} outcomes complete
                    </small>
                  </span>
                  {item.startDate === weekStart ? (
                    <span className="week-count">Viewing</span>
                  ) : (
                    <button
                      className="textbtn"
                      type="button"
                      onClick={() => setWeekStart(item.startDate)}
                    >
                      Review week
                    </button>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p className="muted">Saved weeks will appear here for review.</p>
        )}
      </section>
    </div>
  );
}

function TaskList({
  tasks,
  lessons,
  canSave,
  onStatus,
  onEdit,
  onOpenLesson,
  onOpenProject,
  onOpenClock,
  compact = false,
}: {
  tasks: WeeklyTask[];
  lessons: { id: string; title: string }[];
  canSave: boolean;
  onStatus: (taskId: string, status: WeeklyTaskStatus) => void;
  onEdit: (task: WeeklyTask) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenClock: (topic: string) => void;
  compact?: boolean;
}) {
  return (
    <ul className={compact ? 'week-task-list compact' : 'week-task-list'}>
      {tasks.map((task) => (
        <li className={`week-task ${task.status}`} key={task.id}>
          <div className="week-task-heading">
            <b>{task.title}</b>
            <span className={`week-task-status ${task.status}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>
          {task.description && <p>{task.description}</p>}
          <div className="week-task-meta">
            <span className={`priority-${task.priority}`}>{task.priority} priority</span>
            {task.estimatedMinutes && (
              <span>
                <Clock3 size={12} /> {task.estimatedMinutes} min estimated
              </span>
            )}
          </div>
          <label className="week-task-status-control">
            Task status
            <select
              value={task.status}
              disabled={!canSave}
              onChange={(event) => onStatus(task.id, event.target.value as WeeklyTaskStatus)}
            >
              {WEEKLY_TASK_STATUSES.map((status) => (
                <option value={status} key={status}>
                  {status.replace('-', ' ')}
                </option>
              ))}
            </select>
          </label>
          <div className="week-task-links">
            {task.lessonId && (
              <button
                type="button"
                className="textbtn"
                onClick={() => onOpenLesson(task.lessonId!)}
              >
                <BookOpen size={13} />{' '}
                {lessons.find((lesson) => lesson.id === task.lessonId)?.title ?? task.lessonId}
              </button>
            )}
            {task.projectId && (
              <button
                type="button"
                className="textbtn"
                onClick={() => onOpenProject(task.projectId!)}
              >
                <FolderKanban size={13} /> {task.projectId}:{' '}
                {PROJECT_LADDER.find((project) => project.id === task.projectId)?.title}
              </button>
            )}
            <button type="button" className="textbtn" onClick={() => onOpenClock(task.title)}>
              <Clock3 size={13} /> Study Clock
            </button>
            <button
              type="button"
              className="textbtn"
              disabled={!canSave}
              onClick={() => onEdit(task)}
            >
              Edit / move
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TaskEditor({
  draft,
  weekDates,
  canSave,
  onChange,
  onSave,
  onCancel,
}: {
  draft: TaskDraft;
  weekDates: string[];
  canSave: boolean;
  onChange: (draft: TaskDraft) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const lessons = curriculumOutline.flatMap((stage) => stage.lessons);
  return (
    <section className="panel week-task-editor">
      <div className="week-section-heading">
        <h2>{draft.id ? 'Edit or move task' : 'Add a daily task'}</h2>
        <button className="textbtn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <div className="week-task-form">
        <label>
          Task title
          <input
            value={draft.title}
            disabled={!canSave}
            onChange={(event) => onChange({ ...draft, title: event.target.value })}
          />
        </label>
        <label>
          Description (optional)
          <textarea
            value={draft.description}
            disabled={!canSave}
            onChange={(event) => onChange({ ...draft, description: event.target.value })}
            rows={2}
          />
        </label>
        <label>
          Planned day
          <select
            value={draft.plannedDate}
            disabled={!canSave}
            onChange={(event) => onChange({ ...draft, plannedDate: event.target.value })}
          >
            {weekDates.map((date) => (
              <option key={date} value={date}>
                {localDateLabel(date)} · {date}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estimated duration in minutes (optional)
          <input
            type="number"
            min="1"
            step="1"
            value={draft.estimatedMinutes}
            disabled={!canSave}
            onChange={(event) => onChange({ ...draft, estimatedMinutes: event.target.value })}
          />
        </label>
        <label>
          Priority
          <select
            value={draft.priority}
            disabled={!canSave}
            onChange={(event) =>
              onChange({ ...draft, priority: event.target.value as WeeklyTaskPriority })
            }
          >
            {WEEKLY_TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
        {draft.id && (
          <label>
            Task status
            <select
              value={draft.status}
              disabled={!canSave}
              onChange={(event) =>
                onChange({ ...draft, status: event.target.value as WeeklyTaskStatus })
              }
            >
              {WEEKLY_TASK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replace('-', ' ')}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Related lesson (optional)
          <select
            value={draft.lessonId}
            disabled={!canSave}
            onChange={(event) => onChange({ ...draft, lessonId: event.target.value })}
          >
            <option value="">No lesson link</option>
            {lessons.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.id} · {lesson.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Related project (optional)
          <select
            value={draft.projectId}
            disabled={!canSave}
            onChange={(event) =>
              onChange({ ...draft, projectId: event.target.value as ProjectId | '' })
            }
          >
            <option value="">No project link</option>
            {PROJECT_LADDER.map((project) => (
              <option value={project.id} key={project.id}>
                {project.id} · {project.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        className="primary"
        type="button"
        disabled={!canSave || !draft.title.trim()}
        onClick={onSave}
      >
        <Save size={14} /> {draft.id ? 'Save task' : 'Add task'}
      </button>
    </section>
  );
}
