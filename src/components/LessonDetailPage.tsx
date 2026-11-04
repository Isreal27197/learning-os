import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, ExternalLink } from 'lucide-react';
import type {
  AssessmentQuestion,
  CodeExample,
  CommonMistake,
  ContentSection,
  CurriculumExercise,
  CurriculumResource,
  Lesson,
  LessonMedia,
  LessonMiniBuild,
  WorkedExample,
} from '../data';
import type { CurriculumOutlineLesson, CurriculumOutlineStage } from '../curriculum/outlineTypes';
import type {
  ExerciseAttempt,
  ExerciseAttemptStatus,
  ExerciseTestResult,
  LearningCheckpoint,
  LearningNote,
  UnderstandingStatus,
} from '../lib/learningRecords';
import type { SaveResult } from '../lib/storage';

type LessonDetailPageProps = {
  lesson: Lesson | null;
  stage?: CurriculumOutlineStage;
  completed: boolean;
  previousLesson?: CurriculumOutlineLesson;
  nextLesson?: CurriculumOutlineLesson;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
  onToggleCompletion: () => void;
  onOpenClock: () => void;
  labActivityTarget?: string;
  resumeAttemptId?: string;
  checkpoints: LearningCheckpoint[];
  attempts: ExerciseAttempt[];
  learningNotes: LearningNote[];
  learningRecordStorage: Record<
    'checkpoints' | 'attempts' | 'notes',
    { canSave: boolean; error?: string }
  >;
  onSaveCheckpoint: (record: LearningCheckpoint) => SaveResult;
  onSaveAttempt: (record: ExerciseAttempt) => SaveResult;
  onSaveLearningNote: (record: LearningNote) => SaveResult;
  onDeleteLearningNote: (noteId: string) => SaveResult;
};

function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <section className="lesson-detail-section" key={`${section.title}-${index}`}>
          <h2>{section.title}</h2>
          {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
            <p key={`${section.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
          ))}
          {section.media && <LessonMediaList media={section.media} />}
          {section.codeExamples?.map((example) => (
            <CodeExampleBlock key={example.title} example={example} />
          ))}
        </section>
      ))}
    </>
  );
}

function validateMedia(media: unknown): media is LessonMedia {
  if (!media || typeof media !== 'object') {
    if (import.meta.env.DEV) console.warn('[Lesson media] Skipping an invalid media item.');
    return false;
  }

  const item = media as Record<string, unknown>;
  let valid = false;
  if (item.type === 'image') {
    const src = typeof item.src === 'string' ? item.src.trim() : '';
    const isLocalPath = src.startsWith('/') && !src.startsWith('//');
    let isHttpsUrl = false;
    try {
      isHttpsUrl = new URL(src).protocol === 'https:';
    } catch {
      isHttpsUrl = false;
    }
    valid =
      typeof item.alt === 'string' && item.alt.trim().length > 0 && (isLocalPath || isHttpsUrl);
  } else if (item.type === 'video') {
    valid =
      item.provider === 'youtube' &&
      typeof item.videoId === 'string' &&
      /^[\w-]{11}$/.test(item.videoId) &&
      typeof item.title === 'string' &&
      item.title.trim().length > 0 &&
      typeof item.watchUrl === 'string';
  }

  if (!valid && import.meta.env.DEV) {
    console.warn('[Lesson media] Skipping invalid media item:', media);
  }
  return valid;
}

function LessonMediaList({ media }: { media: LessonMedia[] }) {
  return (
    <div className="lesson-media-list">
      {media.map((item, index) => {
        if (!validateMedia(item)) return null;
        return <LessonMediaItem key={`${item.type}-${index}`} media={item} />;
      })}
    </div>
  );
}

function LessonMediaItem({ media }: { media: LessonMedia }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoRequested, setVideoRequested] = useState(false);

  if (media.type === 'image') {
    const caption = [media.caption, media.credit && `Credit: ${media.credit}`]
      .filter(Boolean)
      .join(' ');
    return (
      <figure className="lesson-media-figure">
        {imageFailed ? (
          <div className="lesson-media-fallback" role="status">
            Image unavailable: {media.alt}
          </div>
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            width={media.width}
            height={media.height}
            onError={() => {
              setImageFailed(true);
              if (import.meta.env.DEV) {
                console.warn('[Lesson media] Image failed to load:', media.src);
              }
            }}
          />
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  const watchUrl = new URL('https://www.youtube.com/watch');
  watchUrl.searchParams.set('v', media.videoId);
  const startSeconds =
    typeof media.startSeconds === 'number' &&
    Number.isFinite(media.startSeconds) &&
    media.startSeconds > 0
      ? Math.floor(media.startSeconds)
      : undefined;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.videoId)}${
    startSeconds ? `?start=${startSeconds}` : ''
  }`;

  return (
    <figure className="lesson-media-figure">
      <div className="lesson-video-frame">
        {videoRequested ? (
          <iframe
            src={embedUrl}
            title={media.title}
            loading="lazy"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="lesson-video-facade" aria-label={`Video: ${media.title}`}>
            <strong>{media.title}</strong>
            <button
              className="lesson-video-play"
              type="button"
              aria-label={`Play video: ${media.title}`}
              onClick={() => setVideoRequested(true)}
            >
              Play video
            </button>
          </div>
        )}
      </div>
      {(media.caption || media.credit) && (
        <figcaption>
          {media.caption}
          {media.caption && media.credit ? ' ' : ''}
          {media.credit && `Credit: ${media.credit}`}
        </figcaption>
      )}
      <a
        className="lesson-video-watch-link"
        href={watchUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube
      </a>
    </figure>
  );
}

function CodeExampleBlock({ example }: { example: CodeExample }) {
  return (
    <figure className="lesson-code-example">
      <figcaption>
        <span>{example.title}</span>
        {example.language && <span className="lesson-code-language">{example.language}</span>}
      </figcaption>
      <pre>
        <code>{example.code}</code>
      </pre>
      <p>{example.explanation}</p>
    </figure>
  );
}

function WorkedExamples({ examples }: { examples: WorkedExample[] }) {
  return (
    <section className="lesson-detail-section">
      <h2>Worked examples</h2>
      <div className="lesson-examples">
        {examples.map((example, index) => (
          <article className="lesson-example" key={`${example.title}-${index}`}>
            <h3>{example.title}</h3>
            {example.problem && (
              <>
                <h4>Problem</h4>
                <p>{example.problem}</p>
              </>
            )}
            {example.reasoning && (
              <>
                <h4>Reasoning</h4>
                <p>{example.reasoning}</p>
              </>
            )}
            {example.solution && (
              <>
                <h4>Solution in brief</h4>
                <pre className="lesson-code">
                  <code>{example.solution}</code>
                </pre>
              </>
            )}
            {example.code && (
              <CodeExampleBlock
                example={{
                  title: 'Python solution',
                  code: example.code,
                  language: example.language ?? 'python',
                  explanation: example.explanation,
                }}
              />
            )}
            <h4>Why it works</h4>
            <p>{example.explanation}</p>
            {example.media && <LessonMediaList media={example.media} />}
          </article>
        ))}
      </div>
    </section>
  );
}

function Resources({ resources }: { resources: CurriculumResource[] }) {
  return (
    <section className="lesson-detail-section">
      <h2>Curated resources</h2>
      <ul className="lesson-resource-list">
        {resources.map((resource) => (
          <li key={resource.id}>
            <a href={resource.url} target="_blank" rel="noreferrer">
              {resource.title} <ExternalLink size={14} aria-hidden="true" />
            </a>
            <span className="lesson-resource-type">{resource.type}</span>
            {resource.explanation && <p>{resource.explanation}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CheckpointRow({
  lessonId,
  title,
  saved,
  canSave,
  onSave,
}: {
  lessonId: string;
  title: string;
  saved?: LearningCheckpoint;
  canSave: boolean;
  onSave: (record: LearningCheckpoint) => SaveResult;
}) {
  const [status, setStatus] = useState<UnderstandingStatus | ''>(saved?.status ?? '');
  const [reflection, setReflection] = useState(saved?.reflection ?? '');
  const [message, setMessage] = useState('');
  useEffect(() => {
    setStatus(saved?.status ?? '');
    setReflection(saved?.reflection ?? '');
  }, [saved?.id, saved?.status, saved?.reflection]);

  const save = () => {
    if (!status) {
      setMessage('Choose an understanding status before saving.');
      return;
    }
    const now = new Date().toISOString();
    const result = onSave({
      id: saved?.id ?? crypto.randomUUID(),
      lessonId,
      title,
      status,
      ...(reflection.trim() ? { reflection: reflection.trim() } : {}),
      createdAt: saved?.createdAt ?? now,
      updatedAt: now,
    });
    setMessage(result.ok ? 'Checkpoint saved.' : `Could not save checkpoint: ${result.error}`);
  };

  return (
    <article className="learning-record-card" id={`checkpoint-${encodeURIComponent(title)}`}>
      <div className="learning-record-heading">
        <h3>{title.replace(/^(Concept|Objective): /, '')}</h3>
        <span className="learning-record-status">{saved ? saved.status : 'Not recorded'}</span>
      </div>
      <label>
        Understanding
        <select
          value={status}
          disabled={!canSave}
          onChange={(event) => setStatus(event.target.value as UnderstandingStatus | '')}
        >
          <option value="">Select status</option>
          <option value="understood">Understood</option>
          <option value="needs-practice">Needs practice</option>
          <option value="stuck">Stuck</option>
        </select>
      </label>
      <label>
        Reflection (optional)
        <textarea
          value={reflection}
          disabled={!canSave}
          onChange={(event) => setReflection(event.target.value)}
          placeholder="What makes sense, or where are you getting stuck?"
          rows={2}
        />
      </label>
      <div className="learning-record-actions">
        <button className="outline" type="button" disabled={!canSave} onClick={save}>
          {saved ? 'Update checkpoint' : 'Save checkpoint'}
        </button>
        {saved && <small>Saved {new Date(saved.updatedAt).toLocaleString()}</small>}
      </div>
      {message && (
        <p className="learning-record-feedback" role="status">
          {message}
        </p>
      )}
    </article>
  );
}

function Checkpoints({
  lessonId,
  records,
  canSave,
  error,
  onSave,
}: {
  lessonId: string;
  records: LearningCheckpoint[];
  canSave: boolean;
  error?: string;
  onSave: (record: LearningCheckpoint) => SaveResult;
}) {
  const reflectionTitle = 'Lesson reflection';
  const reflection = records.find((record) => record.title === reflectionTitle);
  const earlierCheckpoints = records
    .filter((record) => record.title !== reflectionTitle)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <section className="lesson-detail-section learning-workspace">
      <h2>Learning checkpoints</h2>
      <p className="learning-workspace-intro">
        After studying, record what feels clear and what needs more practice. This reflection is
        separate from lesson completion.
      </p>
      {error && (
        <p className="learning-record-warning" role="alert">
          {error}
        </p>
      )}
      <div className="learning-record-list">
        <CheckpointRow
          lessonId={lessonId}
          title={reflectionTitle}
          saved={reflection}
          canSave={canSave}
          onSave={onSave}
        />
      </div>
      {earlierCheckpoints.length > 0 && (
        <details className="checkpoint-history">
          <summary>Earlier saved checkpoints ({earlierCheckpoints.length})</summary>
          <ul className="checkpoint-history-list">
            {earlierCheckpoints.map((record) => (
              <li key={record.id}>
                <div>
                  <strong>{record.title.replace(/^(Concept|Objective): /, '')}</strong>
                  <span className="learning-record-status">{record.status.replace('-', ' ')}</span>
                  {record.reflection && <p>{record.reflection}</p>}
                </div>
                <small>Updated {new Date(record.updatedAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

function ExerciseWorkspace({
  exercise,
  lessonId,
  attempts,
  resumeAttemptId,
  canSave,
  error,
  onSave,
}: {
  exercise: CurriculumExercise;
  lessonId: string;
  attempts: ExerciseAttempt[];
  resumeAttemptId?: string;
  canSave: boolean;
  error?: string;
  onSave: (record: ExerciseAttempt) => SaveResult;
}) {
  const initialAttempt = attempts.find(
    (attempt) => attempt.id === resumeAttemptId && attempt.exerciseId === exercise.id,
  );
  const [attemptId, setAttemptId] = useState<string | null>(initialAttempt?.id ?? null);
  const [solution, setSolution] = useState(initialAttempt?.solution ?? '');
  const [status, setStatus] = useState<ExerciseAttemptStatus>(
    initialAttempt?.status ?? 'in-progress',
  );
  const [testCases, setTestCases] = useState<ExerciseTestResult[]>(
    initialAttempt?.testCases?.map((test) => ({ ...test })) ?? [],
  );
  const [message, setMessage] = useState('');
  const currentAttempt = attempts.find((attempt) => attempt.id === attemptId);
  const orderedAttempts = [...attempts]
    .filter((attempt) => attempt.exerciseId === exercise.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const openAttempt = (attempt?: ExerciseAttempt) => {
    setAttemptId(attempt?.id ?? null);
    setSolution(attempt?.solution ?? '');
    setStatus(attempt?.status ?? 'in-progress');
    setTestCases(attempt?.testCases?.map((test) => ({ ...test })) ?? []);
    setMessage(
      attempt ? 'Earlier attempt opened; editing will update that attempt.' : 'New attempt.',
    );
  };

  const save = () => {
    if (!solution.trim()) {
      setMessage('Add a solution or draft before saving.');
      return;
    }
    const now = new Date().toISOString();
    const existing = currentAttempt;
    const recordId = existing?.id ?? crypto.randomUUID();
    const result = onSave({
      id: recordId,
      lessonId,
      exerciseId: exercise.id,
      title: exercise.title,
      solution,
      ...(testCases.length ? { testCases } : {}),
      status,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
    if (result.ok) setAttemptId(recordId);
    setMessage(result.ok ? 'Attempt saved locally.' : `Could not save attempt: ${result.error}`);
  };

  return (
    <article className="lesson-example exercise-workspace" id={exercise.id}>
      <div className="lesson-section-label">{exercise.difficulty} exercise</div>
      <h3>{exercise.title}</h3>
      <p>{exercise.instructions}</p>
      {exercise.expectedOutcomes.length > 0 && (
        <>
          <h4>Expected outcome</h4>
          <ul>
            {exercise.expectedOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {exercise.acceptanceCriteria.length > 0 && (
        <>
          <h4>Acceptance criteria</h4>
          <ul>
            {exercise.acceptanceCriteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {exercise.constraints?.length ? (
        <>
          <h4>Constraints</h4>
          <ul>
            {exercise.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {exercise.testCases?.length ? (
        <>
          <h4>Suggested test cases</h4>
          <ul>
            {exercise.testCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {error && (
        <p className="learning-record-warning" role="alert">
          {error}
        </p>
      )}
      <div className="attempt-editor">
        <div className="learning-record-heading">
          <h4>{attemptId ? 'Edit saved attempt' : 'New attempt'}</h4>
          {currentAttempt && (
            <span className="learning-record-status">{currentAttempt.status}</span>
          )}
        </div>
        <label>
          Your solution or draft (not executed)
          <textarea
            value={solution}
            disabled={!canSave}
            onChange={(event) => setSolution(event.target.value)}
            placeholder="Write your own solution here. It will be stored as text only."
            rows={8}
            spellCheck={false}
          />
        </label>
        <label>
          Attempt status
          <select
            value={status}
            disabled={!canSave}
            onChange={(event) => setStatus(event.target.value as ExerciseAttemptStatus)}
          >
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="needs-review">Needs review</option>
          </select>
        </label>
        <details className="attempt-tests">
          <summary>Record an optional test result</summary>
          <div className="attempt-test-fields">
            {testCases.map((test, index) => (
              <fieldset className="attempt-test-case" key={index}>
                <legend>Test case {index + 1}</legend>
                <label>
                  Input
                  <input
                    value={test.input}
                    disabled={!canSave}
                    onChange={(event) =>
                      setTestCases((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, input: event.target.value } : item,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Expected result
                  <input
                    value={test.expected}
                    disabled={!canSave}
                    onChange={(event) =>
                      setTestCases((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, expected: event.target.value } : item,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Actual result
                  <input
                    value={test.actual ?? ''}
                    disabled={!canSave}
                    onChange={(event) =>
                      setTestCases((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, actual: event.target.value } : item,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Your recorded result
                  <select
                    value={test.passed === undefined ? '' : test.passed ? 'passed' : 'failed'}
                    disabled={!canSave}
                    onChange={(event) =>
                      setTestCases((current) =>
                        current.map((item, itemIndex) => {
                          if (itemIndex !== index) return item;
                          if (!event.target.value) {
                            const { passed: _passed, ...remaining } = item;
                            return remaining;
                          }
                          return { ...item, passed: event.target.value === 'passed' };
                        }),
                      )
                    }
                  >
                    <option value="">Not recorded</option>
                    <option value="passed">I observed it pass</option>
                    <option value="failed">I observed it fail</option>
                  </select>
                </label>
                <button
                  className="textbtn"
                  type="button"
                  disabled={!canSave}
                  onClick={() =>
                    setTestCases((current) => current.filter((_, itemIndex) => itemIndex !== index))
                  }
                >
                  Remove test case
                </button>
              </fieldset>
            ))}
            <button
              className="outline"
              type="button"
              disabled={!canSave}
              onClick={() => setTestCases((current) => [...current, { input: '', expected: '' }])}
            >
              Add test case
            </button>
            <p>
              Results are self-reported; this workspace does not run code or verify test outcomes.
            </p>
          </div>
        </details>
        <div className="learning-record-actions">
          <button className="primary" type="button" disabled={!canSave} onClick={save}>
            Save attempt
          </button>
          {attemptId && (
            <button className="outline" type="button" onClick={() => openAttempt()}>
              New attempt
            </button>
          )}
        </div>
        {message && (
          <p className="learning-record-feedback" role="status">
            {message}
          </p>
        )}
      </div>
      <div className="attempt-history">
        <h4>Attempt history</h4>
        {orderedAttempts.length ? (
          <ul>
            {orderedAttempts.map((attempt) => (
              <li key={attempt.id}>
                <span>
                  <b>
                    {attempt.status === 'completed'
                      ? 'Completed attempt'
                      : `${attempt.status.replace('-', ' ')} draft`}
                  </b>
                  <small>{new Date(attempt.updatedAt).toLocaleString()}</small>
                </span>
                <button className="textbtn" type="button" onClick={() => openAttempt(attempt)}>
                  Reopen
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No saved attempts yet. Your first save will appear here.</p>
        )}
      </div>
    </article>
  );
}

function Exercises({
  lessonId,
  exercises,
  attempts,
  resumeAttemptId,
  storage,
  onSave,
}: {
  lessonId: string;
  exercises: CurriculumExercise[];
  attempts: ExerciseAttempt[];
  resumeAttemptId?: string;
  storage: { canSave: boolean; error?: string };
  onSave: (record: ExerciseAttempt) => SaveResult;
}) {
  return (
    <section className="lesson-detail-section">
      <h2>Practical exercises</h2>
      <div className="lesson-examples">
        {exercises.map((exercise) => (
          <ExerciseWorkspace
            key={exercise.id}
            exercise={exercise}
            lessonId={lessonId}
            attempts={attempts}
            resumeAttemptId={resumeAttemptId}
            canSave={storage.canSave}
            error={storage.error}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  );
}

function CommonMistakes({ mistakes }: { mistakes: (string | CommonMistake)[] }) {
  return (
    <section className="lesson-detail-section">
      <h2>Common mistakes</h2>
      <div className="lesson-examples">
        {mistakes.map((mistake, index) =>
          typeof mistake === 'string' ? (
            <p key={`mistake-${index}`}>{mistake}</p>
          ) : (
            <article className="lesson-example" key={mistake.title}>
              <h3>{mistake.title}</h3>
              <p>{mistake.explanation}</p>
              {mistake.incorrectCode && (
                <>
                  <h4>Incorrect</h4>
                  <pre className="lesson-code">
                    <code>{mistake.incorrectCode}</code>
                  </pre>
                </>
              )}
              {mistake.correctedCode && (
                <>
                  <h4>Corrected</h4>
                  <pre className="lesson-code">
                    <code>{mistake.correctedCode}</code>
                  </pre>
                </>
              )}
            </article>
          ),
        )}
      </div>
    </section>
  );
}

function LearningNotes({
  lesson,
  notes,
  canSave,
  error,
  onSave,
  onDelete,
}: {
  lesson: Lesson;
  notes: LearningNote[];
  canSave: boolean;
  error?: string;
  onSave: (note: LearningNote) => SaveResult;
  onDelete: (noteId: string) => SaveResult;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [related, setRelated] = useState('');
  const [message, setMessage] = useState('');
  const editingNote = notes.find((note) => note.id === editingId);
  const orderedNotes = [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const startNew = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setRelated('');
    setMessage('');
  };
  const edit = (note: LearningNote) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setRelated(
      note.relatedConceptId
        ? `concept:${note.relatedConceptId}`
        : note.relatedExerciseId
          ? `exercise:${note.relatedExerciseId}`
          : '',
    );
    setMessage('');
  };
  const save = () => {
    if (!title.trim() || !content.trim()) {
      setMessage('Add both a title and note content before saving.');
      return;
    }
    const now = new Date().toISOString();
    const separatorIndex = related.indexOf(':');
    const referenceType = separatorIndex >= 0 ? related.slice(0, separatorIndex) : '';
    const referenceId = separatorIndex >= 0 ? related.slice(separatorIndex + 1) : '';
    const result = onSave({
      id: editingNote?.id ?? crypto.randomUUID(),
      lessonId: lesson.id,
      ...(referenceType === 'concept' && referenceId ? { relatedConceptId: referenceId } : {}),
      ...(referenceType === 'exercise' && referenceId ? { relatedExerciseId: referenceId } : {}),
      title: title.trim(),
      content: content.trim(),
      createdAt: editingNote?.createdAt ?? now,
      updatedAt: now,
    });
    if (result.ok) {
      setEditingId(null);
      setTitle('');
      setContent('');
      setRelated('');
    }
    setMessage(result.ok ? 'Note saved locally.' : `Could not save note: ${result.error}`);
  };
  const remove = (note: LearningNote) => {
    if (!window.confirm(`Delete the note “${note.title}”? This cannot be undone.`)) return;
    const result = onDelete(note.id);
    setMessage(result.ok ? 'Note deleted.' : `Could not delete note: ${result.error}`);
    if (result.ok && editingId === note.id) startNew();
  };

  return (
    <section className="lesson-detail-section learning-workspace">
      <div className="learning-workspace-title">
        <div>
          <h2>Personal learning notes</h2>
          <p className="learning-workspace-intro">
            Capture your explanation, mistakes, discoveries, questions, or connections. These notes
            are separate from the Study Diary.
          </p>
        </div>
        <button className="outline" type="button" disabled={!canSave} onClick={startNew}>
          New note
        </button>
      </div>
      {error && (
        <p className="learning-record-warning" role="alert">
          {error}
        </p>
      )}
      <div className="learning-note-editor">
        <h3>{editingId ? 'Edit note' : 'Write a note'}</h3>
        <p className="muted">
          Try: “My explanation”, “Mistake I made”, “What I discovered”, “Question I still have”, or
          “Connection to another topic”.
        </p>
        <label>
          Title
          <input
            value={title}
            disabled={!canSave}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Related concept or exercise (optional)
          <select
            value={related}
            disabled={!canSave}
            onChange={(event) => setRelated(event.target.value)}
          >
            <option value="">No specific link</option>
            {lesson.keyConcepts?.map((concept) => (
              <option key={`concept:${concept}`} value={`concept:${concept}`}>
                Concept: {concept}
              </option>
            ))}
            {lesson.exercises?.map((exercise) => (
              <option key={`exercise:${exercise.id}`} value={`exercise:${exercise.id}`}>
                Exercise: {exercise.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Note
          <textarea
            value={content}
            disabled={!canSave}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your own explanation or reflection..."
            rows={5}
          />
        </label>
        <div className="learning-record-actions">
          <button className="primary" type="button" disabled={!canSave} onClick={save}>
            {editingId ? 'Update note' : 'Save note'}
          </button>
          {editingId && (
            <button className="outline" type="button" onClick={startNew}>
              Cancel edit
            </button>
          )}
        </div>
      </div>
      {message && (
        <p className="learning-record-feedback" role="status">
          {message}
        </p>
      )}
      <div className="learning-note-list">
        <h3>Saved notes</h3>
        {orderedNotes.length ? (
          orderedNotes.map((note) => (
            <article className="learning-record-card" key={note.id}>
              <div className="learning-record-heading">
                <h3>{note.title}</h3>
                <small>Updated {new Date(note.updatedAt).toLocaleString()}</small>
              </div>
              {note.relatedConceptId && (
                <span className="learning-record-status">Concept: {note.relatedConceptId}</span>
              )}
              {note.relatedExerciseId && (
                <span className="learning-record-status">Exercise: {note.relatedExerciseId}</span>
              )}
              <p className="learning-note-content">{note.content}</p>
              <div className="learning-record-actions">
                <button
                  className="outline"
                  type="button"
                  disabled={!canSave}
                  onClick={() => edit(note)}
                >
                  Edit
                </button>
                <button
                  className="outline danger-button"
                  type="button"
                  disabled={!canSave}
                  onClick={() => remove(note)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="muted">No personal notes for this lesson yet.</p>
        )}
      </div>
    </section>
  );
}

function Assessment({ questions }: { questions: AssessmentQuestion[] }) {
  return (
    <section className="lesson-detail-section">
      <h2>Assessment & self-check</h2>
      <ol className="lesson-assessment-list">
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            {question.expectedAnswer && (
              <details>
                <summary>Reveal answer and explanation</summary>
                <p>{question.expectedAnswer}</p>
                {question.explanation && <p>{question.explanation}</p>}
              </details>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function MiniBuild({ build }: { build: LessonMiniBuild }) {
  return (
    <section className="lesson-detail-section" id="mini-build">
      <div className="lesson-section-label">Independent project</div>
      <h2>{build.title}</h2>
      <p>{build.goal}</p>
      <h4>Requirements</h4>
      <ul>
        {build.requirements.map((requirement) => (
          <li key={requirement}>{requirement}</li>
        ))}
      </ul>
      <h4>Milestones</h4>
      <ol>
        {build.milestones.map((milestone) => (
          <li key={milestone}>{milestone}</li>
        ))}
      </ol>
      <h4>Acceptance criteria</h4>
      <ul>
        {build.acceptanceCriteria.map((criterion) => (
          <li key={criterion}>{criterion}</li>
        ))}
      </ul>
      <h4>Test cases</h4>
      <ul>
        {build.testCases.map((testCase) => (
          <li key={testCase}>{testCase}</li>
        ))}
      </ul>
    </section>
  );
}

export default function LessonDetailPage({
  lesson,
  stage,
  completed,
  previousLesson,
  nextLesson,
  onBack,
  onOpenLesson,
  onToggleCompletion,
  onOpenClock,
  labActivityTarget,
  resumeAttemptId,
  checkpoints,
  attempts,
  learningNotes,
  learningRecordStorage,
  onSaveCheckpoint,
  onSaveAttempt,
  onSaveLearningNote,
  onDeleteLearningNote,
}: LessonDetailPageProps) {
  useEffect(() => {
    if (!lesson || !labActivityTarget) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(labActivityTarget)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lesson?.id, labActivityTarget]);

  if (!lesson) {
    return (
      <section className="panel lesson-not-found" role="status">
        <div className="eyebrow">LESSON UNAVAILABLE</div>
        <h2>This lesson could not be found.</h2>
        <p className="muted">
          The lesson ID may be invalid or no longer present in the curriculum.
        </p>
        <button className="outline" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Roadmap
        </button>
      </section>
    );
  }

  const hasObjectives = Boolean(lesson.learningObjectives?.length);
  const hasPrerequisites = Boolean(lesson.prerequisites?.length);
  const hasConcepts = Boolean(lesson.keyConcepts?.length);
  const hasSections = Boolean(lesson.contentSections?.length);
  const hasExamples = Boolean(lesson.workedExamples?.length);
  const hasMistakes = Boolean(lesson.commonMistakes?.length);
  const hasResources = Boolean(lesson.resources?.length);
  const hasExercises = Boolean(lesson.exercises?.length);
  const hasAssessment = Boolean(lesson.assessmentQuestions?.length);
  const hasMastery = Boolean(lesson.masteryCriteria?.length);
  const hasInterviewRelevance = Boolean(lesson.interviewRelevance);
  const hasMiniBuild = Boolean(lesson.miniBuild);

  return (
    <div className="lesson-detail-page">
      <div className="lesson-detail-toolbar">
        <button className="textbtn" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Roadmap
        </button>
        <button className="outline" onClick={onOpenClock}>
          <Clock3 size={16} /> Study Clock
        </button>
      </div>

      <div className="lesson-detail-layout">
        <article className="panel lesson-detail-content">
          <header className="lesson-detail-header">
            <div className="eyebrow">
              {stage ? `${stage.tag} · ${stage.name}` : lesson.category}
            </div>
            <div className="lesson-detail-heading-row">
              <div>
                <h2>{lesson.title}</h2>
                <p className="lesson-detail-description">{lesson.detail}</p>
              </div>
              <span className={completed ? 'lesson-status completed' : 'lesson-status'}>
                {completed ? 'Completed' : lesson.status}
              </span>
            </div>
            <div className="lesson-detail-meta">
              <span>{lesson.category}</span>
              {lesson.difficulty && <span>{lesson.difficulty}</span>}
              <span>{lesson.id}</span>
            </div>
          </header>

          {hasObjectives && (
            <section className="lesson-detail-section">
              <h2>Learning objectives</h2>
              <ul>
                {lesson.learningObjectives!.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </section>
          )}

          {hasPrerequisites && (
            <section className="lesson-detail-section">
              <h2>Prerequisites</h2>
              <ul className="lesson-prerequisite-list">
                {lesson.prerequisites!.map((prerequisiteId) => (
                  <li key={prerequisiteId}>
                    <button className="textbtn" onClick={() => onOpenLesson(prerequisiteId)}>
                      {prerequisiteId} <ArrowRight size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasConcepts && (
            <section className="lesson-detail-section">
              <h2>Key concepts</h2>
              <ul className="lesson-concepts">
                {lesson.keyConcepts!.map((concept) => (
                  <li key={concept}>{concept}</li>
                ))}
              </ul>
            </section>
          )}

          {lesson.featuredMedia?.length ? (
            <section className="lesson-detail-section">
              <h2>Featured media</h2>
              <LessonMediaList media={lesson.featuredMedia} />
            </section>
          ) : null}

          {hasSections && <ContentSections sections={lesson.contentSections!} />}
          {hasExamples && <WorkedExamples examples={lesson.workedExamples!} />}

          {hasMistakes && <CommonMistakes mistakes={lesson.commonMistakes!} />}

          {hasInterviewRelevance && (
            <section className="lesson-detail-section">
              <h2>Interview relevance</h2>
              <p>{lesson.interviewRelevance}</p>
            </section>
          )}

          {hasResources && <Resources resources={lesson.resources!} />}
          {hasExercises && (
            <Exercises
              lessonId={lesson.id}
              exercises={lesson.exercises!}
              attempts={attempts}
              resumeAttemptId={resumeAttemptId}
              storage={learningRecordStorage.attempts}
              onSave={onSaveAttempt}
            />
          )}
          {hasMiniBuild && <MiniBuild build={lesson.miniBuild!} />}
          {hasAssessment && <Assessment questions={lesson.assessmentQuestions!} />}
          <Checkpoints
            lessonId={lesson.id}
            records={checkpoints}
            canSave={learningRecordStorage.checkpoints.canSave}
            error={learningRecordStorage.checkpoints.error}
            onSave={onSaveCheckpoint}
          />
          <LearningNotes
            lesson={lesson}
            notes={learningNotes}
            canSave={learningRecordStorage.notes.canSave}
            error={learningRecordStorage.notes.error}
            onSave={onSaveLearningNote}
            onDelete={onDeleteLearningNote}
          />

          {hasMastery && (
            <section className="lesson-detail-section">
              <h2>Mastery criteria</h2>
              <ul>
                {lesson.masteryCriteria!.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="lesson-completion">
            <div>
              <div className="eyebrow">LEARNING PROGRESS</div>
              <p>
                {completed
                  ? 'You marked this lesson complete.'
                  : 'Completion is recorded only when you choose.'}
              </p>
            </div>
            <button className={completed ? 'outline' : 'primary'} onClick={onToggleCompletion}>
              <Check size={16} />
              {completed ? 'Undo completion' : 'Mark lesson complete'}
            </button>
          </div>

          {(previousLesson || nextLesson) && (
            <nav className="lesson-pagination" aria-label="Lesson navigation">
              {previousLesson ? (
                <button className="outline" onClick={() => onOpenLesson(previousLesson.id)}>
                  <ArrowLeft size={15} /> {previousLesson.title}
                </button>
              ) : (
                <span />
              )}
              {nextLesson && (
                <button className="outline" onClick={() => onOpenLesson(nextLesson.id)}>
                  {nextLesson.title} <ArrowRight size={15} />
                </button>
              )}
            </nav>
          )}
        </article>

        <aside className="lesson-detail-sidebar">
          <section className="panel">
            <div className="eyebrow">IN THIS STAGE</div>
            <h2>{stage?.name ?? 'Curriculum'}</h2>
            {stage && <p className="muted">{stage.description}</p>}
            <ol>
              {stage?.lessons.map((stageLesson) => (
                <li key={stageLesson.id}>
                  <button
                    className={
                      stageLesson.id === lesson.id
                        ? 'lesson-stage-link active'
                        : 'lesson-stage-link'
                    }
                    aria-current={stageLesson.id === lesson.id ? 'page' : undefined}
                    onClick={() => onOpenLesson(stageLesson.id)}
                  >
                    {stageLesson.title}
                    {completed && stageLesson.id === lesson.id && <Check size={14} />}
                  </button>
                </li>
              ))}
            </ol>
          </section>
          {lesson.relatedProjectIds?.length ? (
            <section className="panel">
              <div className="eyebrow">RELATED PROJECTS</div>
              <ul>
                {lesson.relatedProjectIds.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {lesson.relatedLabActivityIds?.length ? (
            <section className="panel">
              <div className="eyebrow">RELATED LAB ACTIVITIES</div>
              <ul>
                {lesson.relatedLabActivityIds.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {lesson.relatedTools?.length ? (
            <section className="panel">
              <div className="eyebrow">RELATED TOOLS</div>
              <ul>
                {lesson.relatedTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
