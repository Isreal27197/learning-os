import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarDays, Clock3, FolderKanban, Play, Save, Timer } from 'lucide-react';
import {
  effectiveSessionDurationMs,
  type DiaryEntry,
  type StudySession,
  type SaveResult,
} from '../lib/storage';
import {
  WEEKLY_TASK_STATUSES,
  type WeeklyPlan,
  type WeeklyTask,
  type WeeklyTaskStatus,
} from '../lib/weeklyPlanning';
import { formatLocalDate, getMonday } from '../lib/weeklyPlanning';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';

type DailyExecutionPageProps = {
  date: string;
  plans: WeeklyPlan[];
  weeklyCanSave: boolean;
  weeklyError?: string;
  onSaveWeekly: (plans: WeeklyPlan[]) => SaveResult;
  notes: DiaryEntry[];
  notesCanSave: boolean;
  notesError?: string;
  onSaveDiary: (entry: DiaryEntry) => SaveResult;
  sessions: StudySession[];
  sessionsCanSave: boolean;
  sessionsError?: string;
  lessons: { id: string; title: string }[];
  topic: string;
  onTopicChange: (topic: string) => void;
  activeSession: { topic: string } | null;
  elapsedSeconds: number;
  running: boolean;
  onToggleTimer: () => void;
  onFinishSession: () => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenClock: (topic?: string) => void;
  onOpenWeek: () => void;
  formatElapsed: (seconds: number) => string;
};

function localDateLabel(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function sessionLocalDate(session: StudySession) {
  if (session.startedAt && Number.isFinite(Date.parse(session.startedAt))) {
    return formatLocalDate(new Date(session.startedAt));
  }
  return session.date;
}

function localTime(value?: string) {
  if (!value || !Number.isFinite(Date.parse(value))) return null;
  return new Date(value).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function formatMinutes(milliseconds: number) {
  const totalMinutes = Math.floor(milliseconds / 60000);
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

export default function DailyExecutionPage({
  date,
  plans,
  weeklyCanSave,
  weeklyError,
  onSaveWeekly,
  notes,
  notesCanSave,
  notesError,
  onSaveDiary,
  sessions,
  sessionsCanSave,
  sessionsError,
  lessons,
  topic,
  onTopicChange,
  activeSession,
  elapsedSeconds,
  running,
  onToggleTimer,
  onFinishSession,
  onOpenLesson,
  onOpenProject,
  onOpenClock,
  onOpenWeek,
  formatElapsed,
}: DailyExecutionPageProps) {
  const [year, month, day] = date.split('-').map(Number);
  const weekStart = formatLocalDate(getMonday(new Date(year, month - 1, day)));
  const plan = plans.find((item) => item.startDate === weekStart);
  const tasks = useMemo(
    () => (plan?.tasks ?? []).filter((task) => task.plannedDate === date),
    [date, plan],
  );
  const focusedTask = tasks.find((task) => task.id === plan?.dailyFocusTaskIds?.[date]);
  const todayEntry = notes.find((entry) => entry.date === date);
  const otherDiaryEntries = notes.filter((entry) => entry.id !== todayEntry?.id);
  const todaySessions = sessions
    .filter((session) => sessionLocalDate(session) === date)
    .sort((a, b) => (b.startedAt ?? '').localeCompare(a.startedAt ?? ''));
  const actualMilliseconds = todaySessions.reduce(
    (total, session) => total + effectiveSessionDurationMs(session),
    0,
  );
  const [diaryTopic, setDiaryTopic] = useState(topic);
  const [learned, setLearned] = useState('');
  const [blockers, setBlockers] = useState('');
  const [next, setNext] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setDiaryTopic(todayEntry?.topic ?? topic);
    setLearned(todayEntry?.learned ?? '');
    setBlockers(todayEntry?.blockers ?? '');
    setNext(todayEntry?.next ?? '');
    setFeedback('');
  }, [date, todayEntry?.id]);

  const updateWeeklyPlan = (
    update: (current: WeeklyPlan) => WeeklyPlan,
    successMessage: string,
  ) => {
    if (!plan || !weeklyCanSave) return;
    const updated = { ...update(plan), updatedAt: new Date().toISOString() };
    const result = onSaveWeekly(plans.map((item) => (item.id === plan.id ? updated : item)));
    setFeedback(result.ok ? successMessage : `Could not save: ${result.error}`);
  };

  const updateTaskStatus = (taskId: string, status: WeeklyTaskStatus) => {
    updateWeeklyPlan(
      (current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task,
        ),
      }),
      'Task status saved.',
    );
  };

  const selectFocusTask = (taskId: string) => {
    updateWeeklyPlan((current) => {
      const { dailyFocusTaskIds: storedFocuses, ...withoutFocus } = current;
      const dailyFocusTaskIds = { ...storedFocuses };
      if (taskId) dailyFocusTaskIds[date] = taskId;
      else delete dailyFocusTaskIds[date];
      return Object.keys(dailyFocusTaskIds).length
        ? { ...withoutFocus, dailyFocusTaskIds }
        : withoutFocus;
    }, 'Daily focus saved.');
  };

  const saveDiary = () => {
    if (!notesCanSave) {
      setFeedback('Diary storage is unavailable or invalid; changes were not saved.');
      return;
    }
    if (!diaryTopic.trim() && !learned.trim() && !blockers.trim() && !next.trim()) {
      setFeedback('Add a topic or reflection before saving.');
      return;
    }
    const existing = notes.find((entry) => entry.date === date);
    const entry: DiaryEntry = {
      id: existing?.id ?? crypto.randomUUID(),
      date,
      topic: diaryTopic.trim(),
      learned: learned.trim(),
      blockers: blockers.trim(),
      next: next.trim(),
      minutes: existing?.minutes ?? 0,
    };
    const result = onSaveDiary(entry);
    setFeedback(
      result.ok ? 'Daily reflection saved.' : `Could not save reflection: ${result.error}`,
    );
  };

  const handleTopicChange = (nextTopic: string) => {
    onTopicChange(nextTopic);
  };

  const taskStatusList = (status: WeeklyTaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="daily-workspace">
      <section className="panel daily-overview">
        <div className="daily-date">
          <div className="eyebrow">TODAY · {localDateLabel(date).toUpperCase()}</div>
          <h2>{plan?.focus || 'Make one meaningful step today.'}</h2>
        </div>
        <div className="daily-metrics">
          <div>
            <b>{tasks.length}</b>
            <span>planned tasks</span>
          </div>
          <div>
            <b>{taskStatusList('completed').length}</b>
            <span>explicitly completed</span>
          </div>
          <div>
            <b>{formatMinutes(actualMilliseconds)}</b>
            <span>saved study time</span>
          </div>
        </div>
        {!plan && (
          <p className="muted">
            There is no weekly plan for today yet. You can create one in Week.
          </p>
        )}
        {plan && !tasks.length && <p className="muted">No tasks are planned for today.</p>}
        <button className="outline" type="button" onClick={onOpenWeek}>
          <CalendarDays size={15} /> Open Week planner
        </button>
      </section>

      {feedback && (
        <p className="daily-feedback" role="status">
          {feedback}
        </p>
      )}
      {weeklyError && (
        <p className="daily-warning" role="alert">
          {weeklyError}
        </p>
      )}
      {sessionsError && (
        <p className="daily-warning" role="alert">
          {sessionsError}
        </p>
      )}
      {notesError && (
        <p className="daily-warning" role="alert">
          {notesError}
        </p>
      )}

      <section className="panel daily-focus">
        <div className="eyebrow">ONE MAIN PRIORITY</div>
        <h2>Choose your focus for today</h2>
        {tasks.length ? (
          <>
            <label>
              Priority task
              <select
                value={focusedTask?.id ?? ''}
                disabled={!weeklyCanSave}
                onChange={(event) => selectFocusTask(event.target.value)}
              >
                <option value="">Choose one of today's tasks</option>
                {tasks.map((task) => (
                  <option value={task.id} key={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </label>
            {focusedTask ? (
              <div className="daily-next-action">
                <b>Next action</b>
                <p>
                  {focusedTask.status === 'completed'
                    ? `You marked “${focusedTask.title}” complete. Choose another task if you want a new focus.`
                    : focusedTask.status === 'skipped'
                      ? `“${focusedTask.title}” is skipped. Choose another task or update its status.`
                      : `Work on: ${focusedTask.title}`}
                </p>
              </div>
            ) : (
              <p className="muted">
                Choose a task to make your next action clear. This links the existing task; it does
                not create another one.
              </p>
            )}
          </>
        ) : (
          <p className="muted">Add a task in the Week planner before choosing today's priority.</p>
        )}
      </section>

      <section className="panel daily-tasks">
        <div className="daily-heading">
          <div>
            <div className="eyebrow">TODAY'S TASKS</div>
            <h2>Planned work</h2>
          </div>
          <span className="week-count">
            {taskStatusList('completed').length}/{tasks.length} complete
          </span>
        </div>
        {tasks.length ? (
          <ul className="daily-task-list">
            {tasks.map((task) => (
              <DailyTask
                key={task.id}
                task={task}
                lessons={lessons}
                canSave={weeklyCanSave}
                onStatus={updateTaskStatus}
                onOpenLesson={onOpenLesson}
                onOpenProject={onOpenProject}
                onOpenClock={onOpenClock}
              />
            ))}
          </ul>
        ) : (
          <p className="muted">No tasks for today yet. Plan a task in Week to see it here.</p>
        )}
      </section>

      <section className="panel daily-clock">
        <div className="daily-heading">
          <div>
            <div className="eyebrow">STUDY CLOCK</div>
            <h2>Study with the existing timer</h2>
          </div>
          <button className="outline" type="button" onClick={() => onOpenClock()}>
            <Timer size={15} /> Open full Study Clock
          </button>
        </div>
        <label>
          Session topic
          <select value={topic} onChange={(event) => handleTopicChange(event.target.value)}>
            {!lessons.some((lesson) => lesson.title === topic) && (
              <option value={topic}>{topic}</option>
            )}
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.title}>
                {lesson.title}
              </option>
            ))}
            {focusedTask && !lessons.some((lesson) => lesson.title === focusedTask.title) && (
              <option value={focusedTask.title}>{focusedTask.title} · today's priority</option>
            )}
          </select>
        </label>
        <div className="daily-clock-face">{formatElapsed(elapsedSeconds)}</div>
        {activeSession && (
          <p className="muted">
            Active session topic: <b>{activeSession.topic}</b>. Paused time is excluded.
          </p>
        )}
        {!sessionsCanSave && (
          <p className="muted">Session storage is unavailable; a session cannot be safely saved.</p>
        )}
        <div className="daily-clock-actions">
          <button
            className="primary"
            type="button"
            disabled={!sessionsCanSave && !activeSession}
            onClick={onToggleTimer}
          >
            {running ? (
              'Pause'
            ) : activeSession ? (
              'Resume'
            ) : (
              <>
                <Play size={15} /> Start studying
              </>
            )}
          </button>
          <button
            className="outline"
            type="button"
            disabled={!activeSession || !sessionsCanSave}
            onClick={onFinishSession}
          >
            <Save size={15} /> Stop & save
          </button>
        </div>
        <div className="daily-heading daily-session-heading">
          <div>
            <div className="eyebrow">SAVED TODAY</div>
            <h3>Study activity</h3>
          </div>
          <b>{formatMinutes(actualMilliseconds)} actual</b>
        </div>
        {todaySessions.length ? (
          <ul className="daily-session-list">
            {todaySessions.map((session) => (
              <li key={session.id}>
                <span>
                  <b>{session.topic}</b>
                  <small>
                    {localTime(session.startedAt) ?? 'Start time unavailable'}
                    {session.endedAt ? ` – ${localTime(session.endedAt)}` : ''}
                  </small>
                </span>
                <strong>
                  {formatElapsed(Math.floor(effectiveSessionDurationMs(session) / 1000))}
                </strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            No saved study sessions today. Running or unsaved timer activity is not included.
          </p>
        )}
      </section>

      <section className="panel daily-reflection">
        <div className="eyebrow">DAILY REFLECTION</div>
        <h2>What did you learn?</h2>
        <label>
          Topic
          <input
            value={diaryTopic}
            disabled={!notesCanSave}
            onChange={(event) => setDiaryTopic(event.target.value)}
          />
        </label>
        <label>
          What I learned
          <textarea
            value={learned}
            disabled={!notesCanSave}
            onChange={(event) => setLearned(event.target.value)}
            rows={4}
          />
        </label>
        <label>
          What blocked me
          <textarea
            value={blockers}
            disabled={!notesCanSave}
            onChange={(event) => setBlockers(event.target.value)}
            rows={3}
          />
        </label>
        <label>
          What I will do next
          <textarea
            value={next}
            disabled={!notesCanSave}
            onChange={(event) => setNext(event.target.value)}
            rows={3}
          />
        </label>
        <button className="primary" type="button" disabled={!notesCanSave} onClick={saveDiary}>
          <Save size={15} />{' '}
          {todayEntry ? 'Save changes to today’s entry' : 'Save today’s reflection'}
        </button>
      </section>

      <section className="panel daily-review">
        <div className="eyebrow">END-OF-DAY REVIEW</div>
        <h2>Review execution honestly</h2>
        <div className="daily-review-grid">
          <TaskSummary title="Planned tasks" tasks={tasks} />
          <TaskSummary
            title="Completed"
            tasks={taskStatusList('completed')}
            empty="None marked complete yet."
          />
          <TaskSummary
            title="In progress"
            tasks={taskStatusList('in-progress')}
            empty="None in progress."
          />
          <TaskSummary title="Skipped" tasks={taskStatusList('skipped')} empty="None skipped." />
        </div>
        <div className="daily-review-reflections">
          <p>
            <b>What went well?</b>
            <span>{todayEntry?.learned || 'Add this to your reflection above.'}</span>
          </p>
          <p>
            <b>What was difficult?</b>
            <span>{todayEntry?.blockers || 'Add this to your reflection above.'}</span>
          </p>
          <p>
            <b>Carry forward</b>
            <span>{todayEntry?.next || 'Choose a next step in your reflection above.'}</span>
          </p>
          <p>
            <b>Actual saved study time</b>
            <span>{formatMinutes(actualMilliseconds)} from saved sessions only.</span>
          </p>
        </div>
      </section>

      <section className="panel daily-history">
        <div className="eyebrow">STUDY DIARY</div>
        <h2>Previous reflections</h2>
        {otherDiaryEntries.length ? (
          otherDiaryEntries.map((entry) => (
            <article className="diaryentry" key={entry.id}>
              <div className="entrydate">{entry.date}</div>
              <b>{entry.topic}</b>
              {entry.learned && (
                <p>
                  <strong>Learned:</strong> {entry.learned}
                </p>
              )}
              {entry.blockers && (
                <p>
                  <strong>Challenges:</strong> {entry.blockers}
                </p>
              )}
              {entry.next && (
                <p>
                  <strong>Next:</strong> {entry.next}
                </p>
              )}
            </article>
          ))
        ) : (
          <p className="muted">Earlier Study Diary reflections will remain available here.</p>
        )}
      </section>
    </div>
  );
}

function DailyTask({
  task,
  lessons,
  canSave,
  onStatus,
  onOpenLesson,
  onOpenProject,
  onOpenClock,
}: {
  task: WeeklyTask;
  lessons: { id: string; title: string }[];
  canSave: boolean;
  onStatus: (taskId: string, status: WeeklyTaskStatus) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenClock: (topic?: string) => void;
}) {
  return (
    <li className={`daily-task ${task.status}`}>
      <div className="daily-task-main">
        <div>
          <b>{task.title}</b>
          <span className={`week-task-status ${task.status}`}>{task.status.replace('-', ' ')}</span>
        </div>
        {task.description && <p>{task.description}</p>}
        <small className={`priority-${task.priority}`}>
          {task.priority} priority
          {task.estimatedMinutes ? ` · ${task.estimatedMinutes} min planned` : ''}
        </small>
      </div>
      <label>
        Status
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
      <div className="daily-task-links">
        {task.lessonId && (
          <button className="textbtn" type="button" onClick={() => onOpenLesson(task.lessonId!)}>
            <BookOpen size={13} />
            {lessons.find((lesson) => lesson.id === task.lessonId)?.title ?? task.lessonId}
          </button>
        )}
        {task.projectId && (
          <button className="textbtn" type="button" onClick={() => onOpenProject(task.projectId!)}>
            <FolderKanban size={13} />
            {task.projectId}:{' '}
            {PROJECT_LADDER.find((project) => project.id === task.projectId)?.title}
          </button>
        )}
        <button className="textbtn" type="button" onClick={() => onOpenClock(task.title)}>
          <Clock3 size={13} />
          Study Clock
        </button>
      </div>
    </li>
  );
}

function TaskSummary({
  title,
  tasks,
  empty = 'No tasks.',
}: {
  title: string;
  tasks: WeeklyTask[];
  empty?: string;
}) {
  return (
    <div>
      <b>
        {title} · {tasks.length}
      </b>
      <span>{tasks.length ? tasks.map((task) => task.title).join(' · ') : empty}</span>
    </div>
  );
}
