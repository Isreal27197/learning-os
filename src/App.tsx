import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Flag,
  LogIn,
  LogOut,
  Pause,
  Play,
  Plus,
  Search,
  Target,
  Trash2,
} from 'lucide-react';
import { stages, starterGoals } from './data';
import { curriculumOutline } from './curriculum/outline.generated';
import { hasSupabase, supabase } from './lib/supabase';
import { calculateLearningProgress } from './lib/learningProgress';
import {
  formatLocalDate,
  loadWeeklyPlans,
  saveWeeklyPlans,
  type WeeklyPlan,
} from './lib/weeklyPlanning';
import { PROJECT_LADDER, type ProjectId } from './projectLadder';
import {
  loadExerciseAttempts,
  loadLearningCheckpoints,
  loadLearningNotes,
  saveExerciseAttempts,
  saveLearningCheckpoints,
  saveLearningNotes,
  type ExerciseAttempt,
  type LearningCheckpoint,
  type LearningNote,
} from './lib/learningRecords';
import {
  effectiveSessionDurationMs,
  isCompletedLessons,
  isDiaryEntries,
  isGoals,
  isStudySessions,
  loadRecord,
  saveRecord,
  type DiaryEntry,
  type Goal,
  type LoadResult,
  type SaveResult,
  type StorageKey,
  type StudySession,
} from './lib/storage';
import AppShell from './components/AppShell';
import LessonDetailPage from './components/LessonDetailPage';
import WeekPlanningPage from './components/WeekPlanningPage';
import DailyExecutionPage from './components/DailyExecutionPage';
import LabWorkspacePage from './components/LabWorkspacePage';
import CareerWorkspacePage from './components/CareerWorkspacePage';
import { loadCareerWorkspace, saveCareerWorkspace, type CareerWorkspaceData } from './lib/career';
import LibraryWorkspacePage from './components/LibraryWorkspacePage';
import { loadLibraryResources, saveLibraryResources, type LibraryResource } from './lib/library';
import ToolsWorkspacePage from './components/ToolsWorkspacePage';
import { loadToolRecords, saveToolRecords, type ToolRecord } from './lib/tools';
import { PAGE_DEFINITIONS, type PageId } from './navigation';

type Note = DiaryEntry;
type Session = StudySession;
type ActiveSession = {
  topic: string;
  startedAt: string;
  elapsedMs: number;
  runningSince: number | null;
};
const today = () => formatLocalDate(new Date());
const lessonHashPrefix = '#lesson/';
const lessonIdFromHash = (hash: string): string | null => {
  if (!hash.startsWith(lessonHashPrefix)) return null;
  const encodedId = hash.slice(lessonHashPrefix.length);
  if (!encodedId) return '';
  try {
    return decodeURIComponent(encodedId);
  } catch {
    return encodedId;
  }
};
export default function App() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() =>
    lessonIdFromHash(window.location.hash),
  );
  const [labActivityTarget, setLabActivityTarget] = useState<string | undefined>();
  const [labResumeAttemptId, setLabResumeAttemptId] = useState<string | undefined>();
  const [page, setPage] = useState<PageId>(() =>
    lessonIdFromHash(window.location.hash) !== null ? 'lessonDetail' : 'dashboard',
  );
  const [search, setSearch] = useState('');
  const [completedLoad] = useState(() => loadRecord('los-completed', [], isCompletedLessons));
  const [notesLoad] = useState(() => loadRecord('los-notes', [], isDiaryEntries));
  const [goalsLoad] = useState(() => loadRecord('los-goals', starterGoals, isGoals));
  const [sessionsLoad] = useState(() => loadRecord('los-sessions', [], isStudySessions));
  const [weeklyPlansLoad] = useState(loadWeeklyPlans);
  const [careerLoad] = useState(loadCareerWorkspace);
  const [libraryLoad] = useState(loadLibraryResources);
  const [toolsLoad] = useState(loadToolRecords);
  const [checkpointsLoad] = useState(loadLearningCheckpoints);
  const [attemptsLoad] = useState(loadExerciseAttempts);
  const [learningNotesLoad] = useState(loadLearningNotes);
  const [completed, setCompleted] = useState<string[]>(() => completedLoad.value);
  const [notes, setNotes] = useState<Note[]>(() => notesLoad.value);
  const [goals, setGoals] = useState<Goal[]>(() => goalsLoad.value);
  const [sessions, setSessions] = useState<Session[]>(() => sessionsLoad.value);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>(weeklyPlansLoad.value);
  const [careerData, setCareerData] = useState<CareerWorkspaceData>(careerLoad.value);
  const [libraryResources, setLibraryResources] = useState<LibraryResource[]>(libraryLoad.value);
  const [toolRecords, setToolRecords] = useState<ToolRecord[]>(toolsLoad.value);
  const [checkpoints, setCheckpoints] = useState<LearningCheckpoint[]>(checkpointsLoad.value);
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>(attemptsLoad.value);
  const [learningNotes, setLearningNotes] = useState<LearningNote[]>(learningNotesLoad.value);
  const checkpointsRef = useRef(checkpointsLoad.value);
  const attemptsRef = useRef(attemptsLoad.value);
  const learningNotesRef = useRef(learningNotesLoad.value);
  const [storageErrors, setStorageErrors] = useState<Partial<Record<StorageKey, string>>>({});
  const [topic, setTopic] = useState('Python fundamentals and problem solving'),
    [activeSession, setActiveSession] = useState<ActiveSession | null>(null),
    [elapsedMs, setElapsedMs] = useState(0);
  const activeSessionRef = useRef<ActiveSession | null>(null);
  const [clockFeedback, setClockFeedback] = useState('');
  const [goalText, setGoalText] = useState(''),
    [focusedProjectId, setFocusedProjectId] = useState<ProjectId | null>(null),
    [authEmail, setAuthEmail] = useState(''),
    [authPassword, setAuthPassword] = useState(''),
    [user, setUser] = useState<string | null>(null),
    [authMsg, setAuthMsg] = useState('');
  useEffect(() => {
    const handleLessonHashChange = () => {
      const lessonId = lessonIdFromHash(window.location.hash);
      if (lessonId !== null) {
        setSelectedLessonId(lessonId);
        setPage('lessonDetail');
      } else {
        setPage((current) => (current === 'lessonDetail' ? 'roadmap' : current));
      }
    };
    window.addEventListener('hashchange', handleLessonHashChange);
    return () => window.removeEventListener('hashchange', handleLessonHashChange);
  }, []);
  const recordSaveResult = (key: StorageKey, result: SaveResult) => {
    setStorageErrors((current) => {
      if (result.ok) {
        const { [key]: _removed, ...remaining } = current;
        return remaining;
      }
      return { ...current, [key]: result.error };
    });
  };
  const persistCheckpoints = (next: LearningCheckpoint[]) => {
    if (!checkpointsLoad.canSave) {
      return { ok: false as const, error: 'This collection is unavailable or invalid.' };
    }
    const result = saveLearningCheckpoints(next);
    recordSaveResult('los-learning-checkpoints', result);
    if (result.ok) {
      checkpointsRef.current = next;
      setCheckpoints(next);
    }
    return result;
  };
  const persistAttempts = (next: ExerciseAttempt[]) => {
    if (!attemptsLoad.canSave) {
      return { ok: false as const, error: 'This collection is unavailable or invalid.' };
    }
    const result = saveExerciseAttempts(next);
    recordSaveResult('los-exercise-attempts', result);
    if (result.ok) {
      attemptsRef.current = next;
      setAttempts(next);
    }
    return result;
  };
  const persistLearningNotes = (next: LearningNote[]) => {
    if (!learningNotesLoad.canSave) {
      return { ok: false as const, error: 'This collection is unavailable or invalid.' };
    }
    const result = saveLearningNotes(next);
    recordSaveResult('los-learning-notes', result);
    if (result.ok) {
      learningNotesRef.current = next;
      setLearningNotes(next);
    }
    return result;
  };
  const persistWeeklyPlans = (next: WeeklyPlan[]) => {
    if (!weeklyPlansLoad.canSave) {
      return { ok: false as const, error: 'The weekly-plan collection is unavailable or invalid.' };
    }
    const result = saveWeeklyPlans(next);
    recordSaveResult('los-weekly-plans', result);
    if (result.ok) {
      setWeeklyPlans(next);
    }
    return result;
  };
  const persistCareerData = (next: CareerWorkspaceData) => {
    if (!careerLoad.canSave) {
      return { ok: false as const, error: 'Career storage is unavailable or invalid.' };
    }
    const result = saveCareerWorkspace(next);
    recordSaveResult('los-career', result);
    if (result.ok) setCareerData(next);
    return result;
  };
  const persistLibraryResources = (next: LibraryResource[]) => {
    if (!libraryLoad.canSave) {
      return { ok: false as const, error: 'Library storage is unavailable or invalid.' };
    }
    const result = saveLibraryResources(next);
    recordSaveResult('los-library', result);
    if (result.ok) setLibraryResources(next);
    return result;
  };
  const persistToolRecords = (next: ToolRecord[]) => {
    if (!toolsLoad.canSave) {
      return { ok: false as const, error: 'Tools storage is unavailable or invalid.' };
    }
    const result = saveToolRecords(next);
    recordSaveResult('los-tools', result);
    if (result.ok) setToolRecords(next);
    return result;
  };
  useEffect(() => {
    if (!completedLoad.canSave) return;
    recordSaveResult('los-completed', saveRecord('los-completed', completed, isCompletedLessons));
  }, [completed]);
  useEffect(() => {
    if (!goalsLoad.canSave) return;
    recordSaveResult('los-goals', saveRecord('los-goals', goals, isGoals));
  }, [goals]);
  useEffect(() => {
    if (activeSession?.runningSince === null || !activeSession) return;
    const syncElapsed = () => {
      const current = activeSessionRef.current;
      if (current?.runningSince !== null && current)
        setElapsedMs(current.elapsedMs + Math.max(0, Date.now() - current.runningSince));
    };
    syncElapsed();
    const id = window.setInterval(syncElapsed, 1000);
    document.addEventListener('visibilitychange', syncElapsed);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', syncElapsed);
    };
  }, [activeSession?.runningSince]);
  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => setUser(data.session?.user.email ?? null));
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user.email ?? null));
      return () => subscription.unsubscribe();
    }
  }, []);
  useEffect(() => {
    if (page !== 'projects' || !focusedProjectId) return;
    document.getElementById(`project-${focusedProjectId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [page, focusedProjectId]);
  const learningProgress = useMemo(
    () => calculateLearningProgress(curriculumOutline, completed),
    [completed],
  );
  const mins = sessions.reduce((n, s) => n + effectiveSessionDurationMs(s), 0) / 60000;
  const elapsed = Math.floor(elapsedMs / 1000),
    running = Boolean(activeSession && activeSession.runningSince !== null);
  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const filtered = useMemo(
    () =>
      curriculumOutline
        .map((s, index) => ({
          ...s,
          ...learningProgress.stages[index],
          lessons: s.lessons.filter((l) =>
            (l.title + ' ' + l.detail).toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((s) => s.lessons.length),
    [search, learningProgress],
  );
  const curriculumLessons = useMemo(
    () => stages.flatMap((stage) => stage.lessons.map((lesson) => ({ stage, lesson }))),
    [],
  );
  const curriculumLessonOutline = useMemo(
    () => curriculumOutline.flatMap((stage) => stage.lessons),
    [],
  );
  const selectedLesson = curriculumLessons.find(({ lesson }) => lesson.id === selectedLessonId);
  const selectedLessonIndex = selectedLesson
    ? curriculumLessons.findIndex(({ lesson }) => lesson.id === selectedLesson.lesson.id)
    : -1;
  const openLesson = (lessonId: string, activityTarget?: string, attemptId?: string) => {
    const encodedId = encodeURIComponent(lessonId);
    window.history.pushState(
      null,
      '',
      `${window.location.pathname}${window.location.search}${lessonHashPrefix}${encodedId}`,
    );
    setSelectedLessonId(lessonId);
    setLabActivityTarget(activityTarget);
    setLabResumeAttemptId(attemptId);
    setPage('lessonDetail');
  };
  const navigateToPage = (destination: PageId) => {
    if (page === 'lessonDetail' && lessonIdFromHash(window.location.hash) !== null) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    setPage(destination);
  };
  const openStudyClock = (plannedTopic?: string) => {
    if (!activeSessionRef.current) {
      setTopic(plannedTopic ?? selectedLesson?.lesson.title ?? topic);
    }
    navigateToPage('studyClock');
  };
  const openProject = (projectId: ProjectId) => {
    setFocusedProjectId(projectId);
    navigateToPage('projects');
  };
  const toggleTimer = () => {
    const current = activeSessionRef.current,
      now = Date.now();
    if (!current) {
      const startedAt = new Date(now).toISOString(),
        nextSession = { topic, startedAt, elapsedMs: 0, runningSince: now };
      activeSessionRef.current = nextSession;
      setActiveSession(nextSession);
      setElapsedMs(0);
      return;
    }
    const nextSession =
      current.runningSince === null
        ? { ...current, runningSince: now }
        : {
            ...current,
            elapsedMs: current.elapsedMs + Math.max(0, now - current.runningSince),
            runningSince: null,
          };
    activeSessionRef.current = nextSession;
    setActiveSession(nextSession);
    setElapsedMs(
      nextSession.elapsedMs +
        (nextSession.runningSince === null
          ? 0
          : Math.max(0, Date.now() - nextSession.runningSince)),
    );
  };
  const finishSession = () => {
    const current = activeSessionRef.current;
    if (!current) return;
    if (!sessionsLoad.canSave) {
      setClockFeedback(
        'Study-session storage is unavailable or invalid; this session was not saved.',
      );
      return;
    }
    const durationMs = Math.floor(
      current.elapsedMs +
        (current.runningSince === null ? 0 : Math.max(0, Date.now() - current.runningSince)),
    );
    if (durationMs <= 0) {
      setClockFeedback('A zero-duration session was not saved.');
      return;
    }
    const endedAt = new Date().toISOString();
    const savedSession: Session = {
      id: crypto.randomUUID(),
      date: formatLocalDate(new Date(current.startedAt)),
      topic: current.topic,
      seconds: Math.floor(durationMs / 1000),
      startedAt: current.startedAt,
      endedAt,
      durationMs,
    };
    const nextSessions = [savedSession, ...sessions];
    const result = saveRecord('los-sessions', nextSessions, isStudySessions);
    recordSaveResult('los-sessions', result);
    if (!result.ok) {
      setClockFeedback(`Could not save study session: ${result.error}`);
      return;
    }
    activeSessionRef.current = null;
    setActiveSession(null);
    setElapsedMs(0);
    setSessions(nextSessions);
    setClockFeedback('Study session saved.');
  };
  const saveDiaryEntry = (entry: DiaryEntry): SaveResult => {
    if (!notesLoad.canSave) {
      return { ok: false, error: 'Diary storage is unavailable or invalid.' };
    }
    const existing = notes.find((item) => item.date === entry.date);
    const nextNotes = existing
      ? notes.map((item) => (item.id === existing.id ? entry : item))
      : [entry, ...notes];
    const result = saveRecord('los-notes', nextNotes, isDiaryEntries);
    recordSaveResult('los-notes', result);
    if (result.ok) setNotes(nextNotes);
    return result;
  };
  const exportData = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          { exportedAt: new Date().toISOString(), completed, notes, goals, sessions },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'learning-os-backup.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const signIn = async (mode: 'in' | 'up') => {
    if (!supabase) {
      setAuthMsg(
        'Cloud sign-in is not configured yet. Your local workspace works on this device. Add Supabase keys to .env to enable accounts.',
      );
      return;
    }
    const fn =
      mode === 'in'
        ? supabase.auth.signInWithPassword({ email: authEmail, password: authPassword })
        : supabase.auth.signUp({ email: authEmail, password: authPassword });
    const { error } = await fn;
    setAuthMsg(
      error?.message ??
        (mode === 'up'
          ? 'Account created. Check your email if confirmation is enabled.'
          : 'Signed in.'),
    );
  };
  const pageDefinition = PAGE_DEFINITIONS[page];
  const currentView = pageDefinition.view;
  const pageTitle =
    currentView === 'lessonDetail'
      ? (selectedLesson?.lesson.title ?? (selectedLessonId ? 'Lesson not found' : 'Lesson'))
      : pageDefinition.title;
  const loadIssue = <T,>(key: StorageKey, result: LoadResult<T>): string[] =>
    result.canSave
      ? []
      : [
          `Could not safely load ${key}: ${result.error} The stored value is preserved and automatic saves for this collection are paused.`,
        ];
  const storageMessages = [
    ...loadIssue('los-completed', completedLoad),
    ...loadIssue('los-notes', notesLoad),
    ...loadIssue('los-goals', goalsLoad),
    ...loadIssue('los-sessions', sessionsLoad),
    ...loadIssue('los-learning-checkpoints', checkpointsLoad),
    ...loadIssue('los-exercise-attempts', attemptsLoad),
    ...loadIssue('los-learning-notes', learningNotesLoad),
    ...loadIssue('los-weekly-plans', weeklyPlansLoad),
    ...loadIssue('los-career', careerLoad),
    ...loadIssue('los-library', libraryLoad),
    ...loadIssue('los-tools', toolsLoad),
    ...Object.entries(storageErrors).map(
      ([key, error]) => `Could not save ${key}: ${error}. The in-memory change was not persisted.`,
    ),
  ];
  return (
    <AppShell page={page} title={pageTitle} onNavigate={navigateToPage}>
      {storageMessages.map((message) => (
        <p className="storage-warning" role="alert" key={message}>
          {message}
        </p>
      ))}
      {currentView === 'dashboard' && (
        <>
          <section className="welcome">
            <div>
              <div className="eyebrow light">YOUR 2026–2027 LEARNING JOURNEY</div>
              <h2>
                Build the foundations.
                <br />
                <em>Become the engineer.</em>
              </h2>
              <p>
                A deliberate path from Python fundamentals to ML systems and inference
                infrastructure.
              </p>
              <button className="primary" onClick={() => setPage('roadmap')}>
                Continue learning <ChevronRight size={16} />
              </button>
              <button className="textbtn" onClick={() => setPage('analytics')}>
                View analytics
              </button>
            </div>
            <div className="welcome-stat">
              <span>ROADMAP COMPLETION</span>
              <strong>{learningProgress.percentage}%</strong>
              <div className="bar">
                <i style={{ width: learningProgress.percentage + '%' }} />
              </div>
              <small>
                {learningProgress.completedCount} of {learningProgress.totalCount} lessons completed
              </small>
            </div>
          </section>
          <div className="stats">
            <Stat
              label="Study time"
              value={`${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`}
              sub="Recorded sessions"
              icon={<Clock3 />}
            />
            <Stat
              label="Lessons completed"
              value={`${learningProgress.completedCount}`}
              sub={`Across ${curriculumOutline.length} learning stages`}
              icon={<BookOpen />}
            />
            <Stat
              label="Diary entries"
              value={`${notes.length}`}
              sub="Your learning record"
              icon={<CalendarDays />}
            />
            <Stat
              label="Active goals"
              value={`${goals.filter((g) => !g.done).length}`}
              sub="Keep moving forward"
              icon={<Target />}
            />
          </div>
          <div className="columns">
            <section className="panel">
              <div className="panelhead">
                <div>
                  <div className="eyebrow">YOUR CURRICULUM</div>
                  <h3>Learning path</h3>
                </div>
                <button className="textbtn" onClick={() => setPage('roadmap')}>
                  View roadmap <ChevronRight size={15} />
                </button>
              </div>
              {curriculumOutline.slice(0, 4).map((s, i) => (
                <div className="stage-row" key={s.name}>
                  <div className="stage-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="stage-info">
                    <b>{s.name}</b>
                    <small>
                      {s.lessons.length} lessons · {s.tag}
                    </small>
                    <div className="bar">
                      <i style={{ width: learningProgress.stages[i].percentage + '%' }} />
                    </div>
                  </div>
                  <span className="muted">{learningProgress.stages[i].percentage}%</span>
                </div>
              ))}
            </section>
            <section className="panel today">
              <div className="eyebrow">TODAY'S FOCUS</div>
              <h3>Make one meaningful step.</h3>
              <p>
                Choose one concept, understand it, then write code without copying a complete
                solution.
              </p>
              <div className="focusbox">
                <span className="pill">CURRENT STARTING POINT</span>
                <b>Python fundamentals and problem solving</b>
                <small>Practise loops, lists and functions through a small CLI tool.</small>
                <button className="outline" onClick={() => navigateToPage('lab')}>
                  Open today's lesson <ChevronRight size={15} />
                </button>
              </div>
            </section>
          </div>
        </>
      )}
      {currentView === 'week' && (
        <WeekPlanningPage
          plans={weeklyPlans}
          canSave={weeklyPlansLoad.canSave}
          storageError={
            storageErrors['los-weekly-plans'] ??
            (weeklyPlansLoad.canSave ? undefined : weeklyPlansLoad.error)
          }
          onSave={persistWeeklyPlans}
          onOpenLesson={openLesson}
          onOpenProject={openProject}
          onOpenClock={openStudyClock}
        />
      )}
      {currentView === 'roadmap' && (
        <>
          <div className="pageintro">
            <div>
              <div className="eyebrow">PERSONALIZED CURRICULUM</div>
              <p>
                Sequenced for your current level and target role. Advanced inference topics come
                after the foundations they depend on.
              </p>
            </div>
            <div className="search">
              <Search size={16} />
              <input
                placeholder="Find a lesson..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {filtered.map((s) => (
            <section className="panel roadmap" key={s.name}>
              <div className="roadhead">
                <div className="stage-num">
                  {String(
                    curriculumOutline.indexOf(curriculumOutline.find((x) => x.name === s.name)!) +
                      1,
                  ).padStart(2, '0')}
                </div>
                <div>
                  <span className="eyebrow">{s.tag}</span>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
                <span className="count">
                  {s.completedCount}/{s.totalCount}
                </span>
              </div>
              <div className="lessonlist">
                {s.lessons.map((l) => (
                  <button className="lesson" key={l.id} onClick={() => openLesson(l.id)}>
                    <span className={completed.includes(l.id) ? 'check done' : 'check'}>
                      {completed.includes(l.id) ? <Check size={14} /> : null}
                    </span>
                    <span>
                      <b>{l.title}</b>
                      <small>
                        {l.category} · {l.detail}
                      </small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
      {currentView === 'studio' && (
        <LabWorkspacePage
          stages={stages}
          attempts={attempts}
          checkpoints={checkpoints}
          attemptStorageError={
            storageErrors['los-exercise-attempts'] ??
            (attemptsLoad.canSave ? undefined : attemptsLoad.error)
          }
          checkpointStorageError={
            storageErrors['los-learning-checkpoints'] ??
            (checkpointsLoad.canSave ? undefined : checkpointsLoad.error)
          }
          onOpenActivity={(lessonId, activityId, attemptId) => {
            openLesson(
              lessonId,
              activityId === 'mini-build' ? 'mini-build' : activityId,
              attemptId,
            );
          }}
          onOpenCheckpoint={(lessonId, checkpointId) => {
            const checkpoint = checkpoints.find((item) => item.id === checkpointId);
            if (checkpoint) {
              openLesson(lessonId, `checkpoint-${encodeURIComponent(checkpoint.title)}`);
            }
          }}
          onOpenProject={openProject}
          onOpenClock={openStudyClock}
        />
      )}
      {currentView === 'career' && (
        <CareerWorkspacePage
          data={careerData}
          canSave={careerLoad.canSave}
          storageError={
            storageErrors['los-career'] ?? (careerLoad.canSave ? undefined : careerLoad.error)
          }
          onSave={persistCareerData}
          onOpenLesson={openLesson}
          onOpenProject={openProject}
        />
      )}
      {currentView === 'library' && (
        <LibraryWorkspacePage
          resources={libraryResources}
          canSave={libraryLoad.canSave}
          storageError={
            storageErrors['los-library'] ?? (libraryLoad.canSave ? undefined : libraryLoad.error)
          }
          onSave={persistLibraryResources}
          onOpenLesson={openLesson}
          onOpenProject={openProject}
          onOpenCareer={() => navigateToPage('career')}
        />
      )}
      {currentView === 'tools' && (
        <ToolsWorkspacePage
          tools={toolRecords}
          canSave={toolsLoad.canSave}
          storageError={
            storageErrors['los-tools'] ?? (toolsLoad.canSave ? undefined : toolsLoad.error)
          }
          onSave={persistToolRecords}
          onOpenLesson={openLesson}
          onOpenSkill={() => navigateToPage('career')}
          onOpenProject={openProject}
        />
      )}
      {currentView === 'lessonDetail' && (
        <LessonDetailPage
          lesson={selectedLesson?.lesson ?? null}
          stage={selectedLesson?.stage}
          completed={Boolean(selectedLesson && completed.includes(selectedLesson.lesson.id))}
          previousLesson={
            selectedLessonIndex > 0 ? curriculumLessons[selectedLessonIndex - 1].lesson : undefined
          }
          nextLesson={
            selectedLessonIndex >= 0 && selectedLessonIndex < curriculumLessons.length - 1
              ? curriculumLessons[selectedLessonIndex + 1].lesson
              : undefined
          }
          onBack={() => navigateToPage('roadmap')}
          onOpenLesson={openLesson}
          onToggleCompletion={() => {
            if (!selectedLesson) return;
            const lessonId = selectedLesson.lesson.id;
            setCompleted((records) =>
              records.includes(lessonId)
                ? records.filter((id) => id !== lessonId)
                : [...records, lessonId],
            );
          }}
          onOpenClock={openStudyClock}
          labActivityTarget={labActivityTarget}
          resumeAttemptId={labResumeAttemptId}
          checkpoints={checkpoints.filter(
            (record) => record.lessonId === selectedLesson?.lesson.id,
          )}
          attempts={attempts.filter((record) => record.lessonId === selectedLesson?.lesson.id)}
          learningNotes={learningNotes.filter(
            (record) => record.lessonId === selectedLesson?.lesson.id,
          )}
          learningRecordStorage={{
            checkpoints: {
              canSave: checkpointsLoad.canSave,
              error:
                storageErrors['los-learning-checkpoints'] ??
                (checkpointsLoad.canSave ? undefined : checkpointsLoad.error),
            },
            attempts: {
              canSave: attemptsLoad.canSave,
              error:
                storageErrors['los-exercise-attempts'] ??
                (attemptsLoad.canSave ? undefined : attemptsLoad.error),
            },
            notes: {
              canSave: learningNotesLoad.canSave,
              error:
                storageErrors['los-learning-notes'] ??
                (learningNotesLoad.canSave ? undefined : learningNotesLoad.error),
            },
          }}
          onSaveCheckpoint={(record) => {
            const records = checkpointsRef.current;
            const existing = records.find(
              (item) => item.lessonId === record.lessonId && item.title === record.title,
            );
            const nextRecord = existing
              ? { ...record, id: existing.id, createdAt: existing.createdAt }
              : record;
            const next = existing
              ? records.map((item) => (item.id === existing.id ? nextRecord : item))
              : [...records, nextRecord];
            return persistCheckpoints(next);
          }}
          onSaveAttempt={(record) => {
            const records = attemptsRef.current;
            const next = records.some((item) => item.id === record.id)
              ? records.map((item) => (item.id === record.id ? record : item))
              : [...records, record];
            return persistAttempts(next);
          }}
          onSaveLearningNote={(record) => {
            const records = learningNotesRef.current;
            const next = records.some((item) => item.id === record.id)
              ? records.map((item) => (item.id === record.id ? record : item))
              : [...records, record];
            return persistLearningNotes(next);
          }}
          onDeleteLearningNote={(noteId) =>
            persistLearningNotes(learningNotesRef.current.filter((item) => item.id !== noteId))
          }
        />
      )}
      {currentView === 'daily' && (
        <DailyExecutionPage
          date={today()}
          plans={weeklyPlans}
          weeklyCanSave={weeklyPlansLoad.canSave}
          weeklyError={
            storageErrors['los-weekly-plans'] ??
            (weeklyPlansLoad.canSave ? undefined : weeklyPlansLoad.error)
          }
          onSaveWeekly={persistWeeklyPlans}
          notes={notes}
          notesCanSave={notesLoad.canSave}
          notesError={
            storageErrors['los-notes'] ?? (notesLoad.canSave ? undefined : notesLoad.error)
          }
          onSaveDiary={saveDiaryEntry}
          sessions={sessions}
          sessionsCanSave={sessionsLoad.canSave}
          sessionsError={
            storageErrors['los-sessions'] ?? (sessionsLoad.canSave ? undefined : sessionsLoad.error)
          }
          lessons={curriculumLessonOutline.map(({ id, title }) => ({ id, title }))}
          topic={topic}
          onTopicChange={setTopic}
          activeSession={activeSession}
          elapsedSeconds={elapsed}
          running={running}
          onToggleTimer={toggleTimer}
          onFinishSession={finishSession}
          onOpenLesson={openLesson}
          onOpenProject={openProject}
          onOpenClock={openStudyClock}
          onOpenWeek={() => navigateToPage('week')}
          formatElapsed={fmt}
        />
      )}
      {currentView === 'studyClock' && (
        <div className="clock-layout">
          <section className="panel clockpanel">
            <button className="textbtn" onClick={() => navigateToPage('lab')}>
              Back to Lab
            </button>
            <div className="eyebrow">FOCUSED WORK SESSION</div>
            <h3>Protect your attention.</h3>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {!curriculumLessonOutline.some((lesson) => lesson.title === topic) && (
                <option value={topic}>{topic}</option>
              )}
              {curriculumLessonOutline.map((lesson) => (
                <option key={lesson.id}>{lesson.title}</option>
              ))}
            </select>
            <div className="clock">{fmt(elapsed)}</div>
            <div className="clockactions">
              <button
                className="primary"
                disabled={!sessionsLoad.canSave && !activeSession}
                onClick={toggleTimer}
              >
                {running ? (
                  <>
                    <Pause size={17} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={17} /> {elapsed ? 'Resume' : 'Start session'}
                  </>
                )}
              </button>
              <button
                className="outline"
                disabled={!activeSession || !sessionsLoad.canSave}
                onClick={finishSession}
              >
                Stop & save
              </button>
            </div>
            <small className="muted">
              {activeSession
                ? `Active session: ${activeSession.topic}. Paused time is excluded.`
                : 'Choose a topic and start; only Stop & save records a session.'}
            </small>
            {clockFeedback && (
              <p className="notice" role="status">
                {clockFeedback}
              </p>
            )}
          </section>
          <section className="panel">
            <div className="eyebrow">RECENT SESSIONS</div>
            <h3>Time invested</h3>
            {sessions.length === 0 ? (
              <Empty text="Your completed study sessions will show here." />
            ) : (
              sessions.slice(0, 12).map((s) => (
                <div className="sessionrow" key={s.id}>
                  <div>
                    <b>{s.topic}</b>
                    <small>{s.date}</small>
                  </div>
                  <strong>{fmt(s.seconds)}</strong>
                </div>
              ))
            )}
          </section>
        </div>
      )}
      {currentView === 'projects' && (
        <div className="columns">
          <section className="panel">
            <div className="eyebrow">GOALS</div>
            <h3>Keep the next milestone visible.</h3>
            <div className="addgoal">
              <input
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="Add a goal..."
              />
              <button
                className="primary compact"
                onClick={() => {
                  if (goalText.trim()) {
                    setGoals((v) => [
                      { id: crypto.randomUUID(), title: goalText, due: '', done: false },
                      ...v,
                    ]);
                    setGoalText('');
                  }
                }}
              >
                <Plus size={16} />
              </button>
            </div>
            {goals.map((g) => (
              <div className="goalrow" key={g.id}>
                <button
                  className={g.done ? 'check done' : 'check'}
                  onClick={() =>
                    setGoals((v) => v.map((x) => (x.id === g.id ? { ...x, done: !x.done } : x)))
                  }
                >
                  {g.done ? <Check size={14} /> : null}
                </button>
                <div>
                  <b className={g.done ? 'strike' : ''}>{g.title}</b>
                  <small>{g.due ? 'Target: ' + g.due : 'No deadline set'}</small>
                </div>
                <button
                  className="iconbtn"
                  onClick={() => setGoals((v) => v.filter((x) => x.id !== g.id))}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </section>
          <section className="panel">
            <div className="eyebrow">PROJECT LADDER</div>
            <h3>Proof of ability</h3>
            {PROJECT_LADDER.map((project) => (
              <div
                className={
                  focusedProjectId === project.id ? 'projectrow weekly-project-focus' : 'projectrow'
                }
                id={`project-${project.id}`}
                key={project.id}
              >
                <span className="stage-num">{project.id}</span>
                <div>
                  <b>{project.title}</b>
                  <small>{project.status}</small>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
      {currentView === 'analytics' && (
        <>
          <section className="panel">
            <div className="eyebrow">EVIDENCE OVER ACTIVITY</div>
            <h3>Your learning progress</h3>
            <div className="bigprogress">{learningProgress.percentage}%</div>
            <div className="bar tall">
              <i style={{ width: learningProgress.percentage + '%' }} />
            </div>
            <p className="muted">
              {learningProgress.completedCount} lessons completed out of{' '}
              {learningProgress.totalCount}. Progress will grow as you demonstrate understanding and
              complete work.
            </p>
          </section>
          <div className="stats">
            <Stat
              label="Total tracked study"
              value={`${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`}
              sub="From saved sessions"
              icon={<Clock3 />}
            />
            <Stat
              label="Study entries"
              value={`${notes.length}`}
              sub="Reflections saved"
              icon={<CalendarDays />}
            />
            <Stat
              label="Goals completed"
              value={`${goals.filter((g) => g.done).length}`}
              sub={`Of ${goals.length} goals`}
              icon={<Flag />}
            />
          </div>
        </>
      )}
      {currentView === 'account' && (
        <section className="panel authpanel">
          <div className="eyebrow">ACCOUNT & DATA</div>
          <h3>{user ? 'Your account' : 'Create your private workspace'}</h3>
          <p className="muted">
            Cloud accounts use Supabase. Until configured, your notes, timer sessions and progress
            are saved locally in this browser.
          </p>
          {user ? (
            <>
              <p>
                Signed in as <b>{user}</b>
              </p>
              <button
                className="outline"
                onClick={async () => {
                  await supabase?.auth.signOut();
                  setUser(null);
                }}
              >
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              <label>Email</label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <label>Password</label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
              <div className="authactions">
                <button className="primary" onClick={() => signIn('up')}>
                  Create account
                </button>
                <button className="outline" onClick={() => signIn('in')}>
                  <LogIn size={16} /> Sign in
                </button>
              </div>
              {authMsg && <p className="notice">{authMsg}</p>}
            </>
          )}
          <div className="divider" />
          <h3>Export your learning data</h3>
          <p className="muted">
            Download your notes, goals, completed lessons and study sessions as a JSON backup.
          </p>
          <button className="outline" onClick={exportData}>
            <Download size={16} /> Export my data
          </button>
          <p className="tiny">
            Cloud sync requires Supabase project credentials and database setup. See README.md.
          </p>
        </section>
      )}
      {currentView === 'placeholder' && (
        <section className="panel placeholder-page">
          <div className="eyebrow">LEARNING OS · {pageDefinition.title.toUpperCase()}</div>
          <h3>{pageDefinition.title}</h3>
          <p className="muted">{pageDefinition.description}</p>
          {page === 'data' && (
            <div className="data-export">
              <p className="muted">
                Export includes your saved lesson progress, diary entries, goals, and study
                sessions.
              </p>
              <button className="outline" onClick={exportData}>
                <Download size={16} /> Export my learning data
              </button>
            </div>
          )}
        </section>
      )}
      <footer>
        LEARNING OS · BUILT FOR DELIBERATE TECHNICAL PRACTICE{' '}
        <span>v0.1 · Local-first prototype</span>
      </footer>
    </AppShell>
  );
}
function Stat({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="stat">
      <div className="stat-top">
        <span>{label}</span>
        {icon}
      </div>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  );
}
function Empty({ text }: { text: string }) {
  return <div className="empty">{text}</div>;
}
