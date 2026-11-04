import { useMemo, useState } from 'react';
import {
  Archive,
  BookOpen,
  ExternalLink,
  FolderKanban,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import {
  LIBRARY_LESSONS,
  LIBRARY_PRIORITIES,
  LIBRARY_PROJECTS,
  LIBRARY_RESOURCE_STATUSES,
  LIBRARY_RESOURCE_TYPES,
  LIBRARY_SKILLS,
  type LibraryPriority,
  type LibraryResource,
  type LibraryResourceStatus,
  type LibraryResourceType,
} from '../lib/library';
import type { SaveResult } from '../lib/storage';
import type { ProjectId } from '../projectLadder';

type LibraryWorkspacePageProps = {
  resources: LibraryResource[];
  canSave: boolean;
  storageError?: string;
  onSave: (resources: LibraryResource[]) => SaveResult;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenCareer: () => void;
};

type ResourceDraft = Omit<LibraryResource, 'id' | 'dateAdded'>;
type SortMode = 'recent' | 'title' | 'status';

const emptyDraft = (): ResourceDraft => ({
  title: '',
  url: '',
  type: 'documentation',
  description: '',
  source: '',
  author: '',
  tags: [],
  status: 'saved',
  notes: '',
  lessonIds: [],
  skillIds: [],
  projectIds: [],
});
const localDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const label = (value: string) => value.replace(/-/g, ' ');
const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
};
const byOption = (options: { id: string; title: string }[], id: string) =>
  options.find((option) => option.id === id)?.title ?? `${id} (unavailable)`;

export default function LibraryWorkspacePage({
  resources,
  canSave,
  storageError,
  onSave,
  onOpenLesson,
  onOpenProject,
  onOpenCareer,
}: LibraryWorkspacePageProps) {
  const [draft, setDraft] = useState<ResourceDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<LibraryResourceType | ''>('');
  const [statusFilter, setStatusFilter] = useState<LibraryResourceStatus | ''>('');
  const [lessonFilter, setLessonFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [sort, setSort] = useState<SortMode>('recent');

  const persist = (next: LibraryResource[], message: string): SaveResult => {
    if (!canSave) {
      const result = { ok: false as const, error: 'Library storage is unavailable or invalid.' };
      setFeedback(result.error);
      return result;
    }
    const result = onSave(next);
    setFeedback(result.ok ? message : `Could not save Library data: ${result.error}`);
    return result;
  };
  const resetForm = () => {
    setDraft(emptyDraft());
    setEditingId(null);
  };
  const beginEdit = (resource: LibraryResource) => {
    setEditingId(resource.id);
    setDraft({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      description: resource.description,
      source: resource.source,
      author: resource.author ?? '',
      tags: [...resource.tags],
      rating: resource.rating,
      priority: resource.priority,
      status: resource.status,
      notes: resource.notes,
      lessonIds: [...resource.lessonIds],
      skillIds: [...resource.skillIds],
      projectIds: [...resource.projectIds],
      estimatedMinutes: resource.estimatedMinutes,
    });
    document.getElementById('library-resource-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const saveDraft = () => {
    if (!draft.title.trim() || !draft.url.trim()) {
      setFeedback('A resource title and URL are required.');
      return;
    }
    const existing = resources.find((resource) => resource.id === editingId);
    const { author, rating, priority, estimatedMinutes, ...requiredFields } = draft;
    const nextResource: LibraryResource = {
      ...requiredFields,
      title: draft.title.trim(),
      url: draft.url.trim(),
      description: draft.description.trim(),
      source: draft.source.trim(),
      notes: draft.notes.trim(),
      ...(author?.trim() ? { author: author.trim() } : {}),
      ...(rating === undefined ? {} : { rating }),
      ...(priority === undefined ? {} : { priority }),
      ...(estimatedMinutes === undefined ? {} : { estimatedMinutes }),
      id: existing?.id ?? crypto.randomUUID(),
      dateAdded: existing?.dateAdded ?? localDate(),
    };
    const next = existing
      ? resources.map((resource) => (resource.id === existing.id ? nextResource : resource))
      : [nextResource, ...resources];
    if (persist(next, existing ? 'Resource updated.' : 'Resource added.').ok) resetForm();
  };
  const removeResource = (resource: LibraryResource) => {
    if (!window.confirm(`Delete “${resource.title}” from your Library?`)) return;
    persist(
      resources.filter((item) => item.id !== resource.id),
      'Resource deleted.',
    );
    if (editingId === resource.id) resetForm();
  };
  const changeStatus = (resource: LibraryResource, status: LibraryResourceStatus) =>
    persist(
      resources.map((item) => (item.id === resource.id ? { ...item, status } : item)),
      status === 'archived' ? 'Resource archived.' : 'Resource restored.',
    );

  const visibleResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = resources.filter((resource) => {
      const searchText = [
        resource.title,
        resource.description,
        resource.source,
        resource.author ?? '',
        ...resource.tags,
      ]
        .join(' ')
        .toLowerCase();
      return (
        (!normalizedQuery || searchText.includes(normalizedQuery)) &&
        (!typeFilter || resource.type === typeFilter) &&
        (!statusFilter || resource.status === statusFilter) &&
        (!lessonFilter || resource.lessonIds.includes(lessonFilter)) &&
        (!skillFilter || resource.skillIds.includes(skillFilter)) &&
        (!projectFilter || resource.projectIds.some((id) => id === projectFilter))
      );
    });
    return filtered.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'status')
        return a.status.localeCompare(b.status) || a.title.localeCompare(b.title);
      return b.dateAdded.localeCompare(a.dateAdded) || a.title.localeCompare(b.title);
    });
  }, [resources, query, typeFilter, statusFilter, lessonFilter, skillFilter, projectFilter, sort]);

  const learningCount = resources.filter((resource) => resource.status === 'learning').length;
  const completedCount = resources.filter((resource) => resource.status === 'completed').length;

  const updateMultiSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    field: 'lessonIds' | 'skillIds' | 'projectIds',
  ) => {
    const selectedIds = Array.from(event.currentTarget.selectedOptions, (option) => option.value);
    setDraft((current) => ({
      ...current,
      [field]: selectedIds,
    }));
  };

  return (
    <div className="library-workspace">
      {storageError && (
        <p className="library-warning" role="alert">
          {storageError}
        </p>
      )}
      {feedback && (
        <p className="library-feedback" role="status">
          {feedback}
        </p>
      )}

      <section className="panel library-intro">
        <div>
          <div className="eyebrow">YOUR LOCAL LEARNING COLLECTION</div>
          <h2>Save useful resources. Connect them to what you are learning.</h2>
          <p>
            Keep documentation, articles, papers, courses, and other references together with your
            own notes and links to lessons, skills, and projects.
          </p>
        </div>
        <span className="library-local-tag">Stored on this device</span>
      </section>

      <section className="library-metrics" aria-label="Library overview">
        <article className="library-metric">
          <b>{resources.length}</b>
          <span>Saved resources</span>
        </article>
        <article className="library-metric">
          <b>{learningCount}</b>
          <span>Currently learning</span>
        </article>
        <article className="library-metric">
          <b>{completedCount}</b>
          <span>Completed resources</span>
        </article>
        <article className="library-metric">
          <b>
            {
              LIBRARY_RESOURCE_TYPES.filter((type) =>
                resources.some((resource) => resource.type === type),
              ).length
            }
          </b>
          <span>Resource types represented</span>
        </article>
      </section>
      <section className="panel library-breakdown" aria-label="Resource groups">
        <div>
          <h2>By status</h2>
          <div className="library-group-list">
            {LIBRARY_RESOURCE_STATUSES.map((status) => (
              <button
                type="button"
                className={statusFilter === status ? 'library-group active' : 'library-group'}
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
              >
                <span>{label(status)}</span>
                <b>{resources.filter((resource) => resource.status === status).length}</b>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2>By type</h2>
          <div className="library-group-list">
            {LIBRARY_RESOURCE_TYPES.map((type) => (
              <button
                type="button"
                className={typeFilter === type ? 'library-group active' : 'library-group'}
                key={type}
                onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
              >
                <span>{label(type)}</span>
                <b>{resources.filter((resource) => resource.type === type).length}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel library-section" id="library-resource-form">
        <div className="library-section-heading">
          <div>
            <div className="eyebrow">{editingId ? 'UPDATE RESOURCE' : 'QUICK CAPTURE'}</div>
            <h2>{editingId ? 'Edit resource' : 'Add a resource'}</h2>
          </div>
          <span className="library-count">{canSave ? 'Ready to save' : 'Saving disabled'}</span>
        </div>
        <div className="library-form-grid">
          <label>
            Title
            <input
              value={draft.title}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="Resource title"
            />
          </label>
          <label>
            URL
            <input
              type="url"
              required
              value={draft.url}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, url: event.target.value })}
              placeholder="https://"
            />
          </label>
          <label>
            Type
            <select
              value={draft.type}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({ ...draft, type: event.target.value as LibraryResourceType })
              }
            >
              {LIBRARY_RESOURCE_TYPES.map((type) => (
                <option value={type} key={type}>
                  {label(type)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={draft.status}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({ ...draft, status: event.target.value as LibraryResourceStatus })
              }
            >
              {LIBRARY_RESOURCE_STATUSES.map((status) => (
                <option value={status} key={status}>
                  {label(status)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Source / publisher
            <input
              value={draft.source}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, source: event.target.value })}
              placeholder="Publisher or organization"
            />
          </label>
          <label>
            Author (optional)
            <input
              value={draft.author ?? ''}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, author: event.target.value })}
            />
          </label>
          <label>
            Tags (comma-separated)
            <input
              value={draft.tags.join(', ')}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  tags: [
                    ...new Set(
                      event.target.value
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    ),
                  ],
                })
              }
              placeholder="python, systems, research"
            />
          </label>
          <label>
            Priority (optional)
            <select
              value={draft.priority ?? ''}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  priority: event.target.value
                    ? (event.target.value as LibraryPriority)
                    : undefined,
                })
              }
            >
              <option value="">No priority</option>
              {LIBRARY_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {label(priority)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Rating (optional, 1–5)
            <input
              type="number"
              min="1"
              max="5"
              step="1"
              value={draft.rating ?? ''}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  rating: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </label>
          <label>
            Estimated minutes (optional)
            <input
              type="number"
              min="1"
              step="1"
              value={draft.estimatedMinutes ?? ''}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  estimatedMinutes: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </label>
          <label className="library-form-wide">
            Short description
            <textarea
              rows={2}
              value={draft.description}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            />
          </label>
          <label className="library-form-wide">
            Personal notes
            <textarea
              rows={3}
              value={draft.notes}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
              placeholder="Why is this useful? What do you want to remember?"
            />
          </label>
          <label>
            Linked lessons
            <select
              multiple
              size={5}
              value={draft.lessonIds}
              disabled={!canSave}
              onChange={(event) => updateMultiSelect(event, 'lessonIds')}
            >
              {draft.lessonIds
                .filter((id) => !LIBRARY_LESSONS.some((lesson) => lesson.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {LIBRARY_LESSONS.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
            <small>Use Ctrl/Command to select more than one.</small>
          </label>
          <label>
            Linked career skills
            <select
              multiple
              size={5}
              value={draft.skillIds}
              disabled={!canSave}
              onChange={(event) => updateMultiSelect(event, 'skillIds')}
            >
              {draft.skillIds
                .filter((id) => !LIBRARY_SKILLS.some((skill) => skill.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {LIBRARY_SKILLS.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
            <small>Use Ctrl/Command to select more than one.</small>
          </label>
          <label>
            Linked projects
            <select
              multiple
              size={5}
              value={draft.projectIds}
              disabled={!canSave}
              onChange={(event) => updateMultiSelect(event, 'projectIds')}
            >
              {draft.projectIds
                .filter((id) => !LIBRARY_PROJECTS.some((project) => project.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {LIBRARY_PROJECTS.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.id} · {project.title}
                </option>
              ))}
            </select>
            <small>Use Ctrl/Command to select more than one.</small>
          </label>
        </div>
        <div className="library-actions">
          <button className="primary" type="button" disabled={!canSave} onClick={saveDraft}>
            <Save size={14} /> {editingId ? 'Save changes' : 'Save resource'}
          </button>
          {editingId && (
            <button className="textbtn" type="button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </section>

      <section className="panel library-section">
        <div className="library-section-heading">
          <div>
            <div className="eyebrow">FIND & ORGANIZE</div>
            <h2>Your resources</h2>
          </div>
          <span className="library-count">
            {visibleResources.length} of {resources.length}
          </span>
        </div>
        <div className="library-filters">
          <label className="library-search">
            Search resources
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, description, source, author, or tags"
            />
          </label>
          <label>
            Type
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as LibraryResourceType | '')}
            >
              <option value="">All types</option>
              {LIBRARY_RESOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {label(type)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as LibraryResourceStatus | '')
              }
            >
              <option value="">All statuses</option>
              {LIBRARY_RESOURCE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {label(status)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Lesson
            <select value={lessonFilter} onChange={(event) => setLessonFilter(event.target.value)}>
              <option value="">Any lesson</option>
              {LIBRARY_LESSONS.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Skill
            <select value={skillFilter} onChange={(event) => setSkillFilter(event.target.value)}>
              <option value="">Any skill</option>
              {LIBRARY_SKILLS.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Project
            <select
              value={projectFilter}
              onChange={(event) => setProjectFilter(event.target.value)}
            >
              <option value="">Any project</option>
              {LIBRARY_PROJECTS.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.id} · {project.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option value="recent">Recently added</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
            </select>
          </label>
        </div>
        {resources.length === 0 ? (
          <div className="library-empty">
            <BookOpen size={22} />
            <h3>Your Library is ready</h3>
            <p>
              No resources saved yet. Add a link you already trust; this workspace does not seed or
              verify resources for you.
            </p>
            <button
              className="outline"
              type="button"
              onClick={() =>
                document
                  .getElementById('library-resource-form')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <Plus size={14} /> Add your first resource
            </button>
          </div>
        ) : visibleResources.length === 0 ? (
          <div className="library-empty">
            <h3>No matching resources</h3>
            <p>Try changing the search or filters.</p>
          </div>
        ) : (
          <div className="library-resource-list">
            {visibleResources.map((resource) => (
              <article className="library-resource-card" key={resource.id}>
                <div className="library-resource-main">
                  <div className="library-resource-meta">
                    <span className="library-type">{label(resource.type)}</span>
                    <span className={`library-status ${resource.status}`}>
                      {label(resource.status)}
                    </span>
                    {resource.priority && (
                      <span className={`library-priority ${resource.priority}`}>
                        {resource.priority} priority
                      </span>
                    )}
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description || 'No description provided.'}</p>
                  <div className="library-resource-source">
                    {resource.source || 'Source not specified'}
                    {resource.author ? ` · ${resource.author}` : ''} · Added {resource.dateAdded}
                    {resource.estimatedMinutes
                      ? ` · ${formatDuration(resource.estimatedMinutes)}`
                      : ''}
                    {resource.rating ? ` · ${resource.rating}/5` : ''}
                  </div>
                  {resource.tags.length > 0 && (
                    <div className="library-tags">
                      {resource.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <details className="library-detail">
                    <summary>Details, notes & links</summary>
                    <div className="library-detail-body">
                      <p>
                        <b>Personal notes</b>
                        <br />
                        {resource.notes || 'No personal notes yet.'}
                      </p>
                      <p>
                        <b>Linked lessons</b>
                      </p>
                      {resource.lessonIds.length ? (
                        <div className="library-link-list">
                          {resource.lessonIds.map((id) => {
                            const lesson = LIBRARY_LESSONS.find((item) => item.id === id);
                            return lesson ? (
                              <button
                                className="textbtn"
                                type="button"
                                key={id}
                                onClick={() => onOpenLesson(id)}
                              >
                                <BookOpen size={13} /> {lesson.title}
                              </button>
                            ) : (
                              <span className="library-unavailable" key={id}>
                                {id} (unavailable)
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                      <p>
                        <b>Linked career skills</b>
                      </p>
                      {resource.skillIds.length ? (
                        <div className="library-link-list">
                          {resource.skillIds.map((id) => (
                            <button
                              className="textbtn"
                              type="button"
                              key={id}
                              onClick={onOpenCareer}
                            >
                              {LIBRARY_SKILLS.find((item) => item.id === id)?.name ??
                                `${id} (unavailable)`}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                      <p>
                        <b>Linked projects</b>
                      </p>
                      {resource.projectIds.length ? (
                        <div className="library-link-list">
                          {resource.projectIds.map((id) => {
                            const project = LIBRARY_PROJECTS.find((item) => item.id === id);
                            return project ? (
                              <button
                                className="textbtn"
                                type="button"
                                key={id}
                                onClick={() => onOpenProject(id)}
                              >
                                <FolderKanban size={13} /> {id} · {project.title}
                              </button>
                            ) : (
                              <span className="library-unavailable" key={id}>
                                {id} (unavailable)
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                    </div>
                  </details>
                </div>
                <div className="library-resource-actions">
                  <a
                    className="outline library-open-link"
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} /> Open URL
                  </a>
                  <button
                    className="textbtn"
                    type="button"
                    disabled={!canSave}
                    onClick={() => beginEdit(resource)}
                  >
                    Edit
                  </button>
                  {resource.status === 'archived' ? (
                    <button
                      className="textbtn"
                      type="button"
                      disabled={!canSave}
                      onClick={() => changeStatus(resource, 'saved')}
                    >
                      <RotateCcw size={13} /> Restore
                    </button>
                  ) : (
                    <button
                      className="textbtn"
                      type="button"
                      disabled={!canSave}
                      onClick={() => changeStatus(resource, 'archived')}
                    >
                      <Archive size={13} /> Archive
                    </button>
                  )}
                  <button
                    className="iconbtn"
                    type="button"
                    disabled={!canSave}
                    aria-label={`Delete ${resource.title}`}
                    onClick={() => removeResource(resource)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
