import { useMemo, useState, type ChangeEvent } from 'react';
import {
  Archive,
  BookOpen,
  ExternalLink,
  FolderKanban,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import type { ProjectId } from '../projectLadder';
import type { SaveResult } from '../lib/storage';
import {
  DEFAULT_TOOL_CATEGORIES,
  TOOL_LESSONS,
  TOOL_PRIORITIES,
  TOOL_PROJECTS,
  TOOL_SKILLS,
  TOOL_STATUSES,
  type ToolPriority,
  type ToolRecord,
  type ToolStatus,
} from '../lib/tools';

type ToolsWorkspacePageProps = {
  tools: ToolRecord[];
  canSave: boolean;
  storageError?: string;
  onSave: (tools: ToolRecord[]) => SaveResult;
  onOpenLesson: (lessonId: string) => void;
  onOpenSkill: () => void;
  onOpenProject: (projectId: ProjectId) => void;
};
type ToolDraft = Omit<ToolRecord, 'id' | 'dateAdded' | 'lastUpdated'>;
type SortMode = 'recent' | 'name' | 'status' | 'category';

const emptyDraft = (): ToolDraft => ({
  name: '',
  category: DEFAULT_TOOL_CATEGORIES[0],
  description: '',
  url: '',
  status: 'not-explored',
  priority: 'medium',
  notes: '',
  tags: [],
  lessonIds: [],
  skillIds: [],
  projectIds: [],
});
const localDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const label = (value: string) => value.replace(/-/g, ' ');
const lessonTitle = (id: string) =>
  TOOL_LESSONS.find((lesson) => lesson.id === id)?.title ?? `${id} (unavailable)`;
const skillTitle = (id: string) =>
  TOOL_SKILLS.find((skill) => skill.id === id)?.name ?? `${id} (unavailable)`;
const projectTitle = (id: string) =>
  TOOL_PROJECTS.find((project) => project.id === id)?.title ?? `${id} (unavailable)`;

export default function ToolsWorkspacePage({
  tools,
  canSave,
  storageError,
  onSave,
  onOpenLesson,
  onOpenSkill,
  onOpenProject,
}: ToolsWorkspacePageProps) {
  const [draft, setDraft] = useState<ToolDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<ToolStatus | ''>('');
  const [sort, setSort] = useState<SortMode>('recent');

  const categories = useMemo(
    () =>
      [...new Set([...DEFAULT_TOOL_CATEGORIES, ...tools.map((tool) => tool.category)])].sort(
        (a, b) => a.localeCompare(b),
      ),
    [tools],
  );
  const visibleTools = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = tools.filter((tool) => {
      const searchableText = [tool.name, tool.description, ...tool.tags].join(' ').toLowerCase();
      return (
        (!search || searchableText.includes(search)) &&
        (!categoryFilter || tool.category === categoryFilter) &&
        (!statusFilter || tool.status === statusFilter)
      );
    });
    return filtered.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'status')
        return a.status.localeCompare(b.status) || a.name.localeCompare(b.name);
      if (sort === 'category')
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      return b.lastUpdated.localeCompare(a.lastUpdated) || a.name.localeCompare(b.name);
    });
  }, [tools, query, categoryFilter, statusFilter, sort]);

  const persist = (next: ToolRecord[], successMessage: string): SaveResult => {
    if (!canSave) {
      const result = { ok: false as const, error: 'Tools storage is unavailable or invalid.' };
      setFeedback(result.error);
      return result;
    }
    const result = onSave(next);
    setFeedback(result.ok ? successMessage : `Could not save tool records: ${result.error}`);
    return result;
  };
  const resetForm = () => {
    setDraft(emptyDraft());
    setEditingId(null);
  };
  const editTool = (tool: ToolRecord) => {
    setEditingId(tool.id);
    setDraft({
      name: tool.name,
      category: tool.category,
      description: tool.description,
      url: tool.url,
      status: tool.status,
      priority: tool.priority,
      notes: tool.notes,
      tags: [...tool.tags],
      lessonIds: [...tool.lessonIds],
      skillIds: [...tool.skillIds],
      projectIds: [...tool.projectIds],
    });
    document.getElementById('tools-record-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const saveTool = () => {
    if (!draft.name.trim() || !draft.category.trim() || !draft.url.trim()) {
      setFeedback('Tool name, category, and official website or documentation URL are required.');
      return;
    }
    const current = tools.find((tool) => tool.id === editingId);
    const now = new Date().toISOString();
    const record: ToolRecord = {
      ...draft,
      name: draft.name.trim(),
      category: draft.category.trim(),
      description: draft.description.trim(),
      url: draft.url.trim(),
      notes: draft.notes.trim(),
      tags: [...new Set(draft.tags.map((tag) => tag.trim()).filter(Boolean))],
      id: current?.id ?? crypto.randomUUID(),
      dateAdded: current?.dateAdded ?? localDate(),
      lastUpdated: now,
    };
    const next = current
      ? tools.map((tool) => (tool.id === current.id ? record : tool))
      : [record, ...tools];
    if (persist(next, current ? 'Tool updated.' : 'Tool added.').ok) resetForm();
  };
  const deleteTool = (tool: ToolRecord) => {
    if (!window.confirm(`Delete “${tool.name}” from Tools?`)) return;
    persist(
      tools.filter((item) => item.id !== tool.id),
      'Tool deleted.',
    );
    if (editingId === tool.id) resetForm();
  };
  const updateStatus = (tool: ToolRecord, status: ToolStatus) =>
    persist(
      tools.map((item) =>
        item.id === tool.id ? { ...item, status, lastUpdated: new Date().toISOString() } : item,
      ),
      status === 'archived' ? 'Tool archived.' : 'Tool restored.',
    );
  const changeLinks = (
    event: ChangeEvent<HTMLSelectElement>,
    field: 'lessonIds' | 'skillIds' | 'projectIds',
  ) => {
    const ids = Array.from(event.currentTarget.selectedOptions, (option) => option.value);
    setDraft((current) => ({ ...current, [field]: ids }));
  };
  const countForStatus = (status: ToolStatus) =>
    tools.filter((tool) => tool.status === status).length;

  return (
    <div className="tools-workspace">
      {storageError && (
        <p className="tools-warning" role="alert">
          {storageError}
        </p>
      )}
      {feedback && (
        <p className="tools-feedback" role="status">
          {feedback}
        </p>
      )}

      <section className="panel tools-intro">
        <div>
          <div className="eyebrow">TOOLS · TECHNOLOGY · ADOPTION</div>
          <h2>Track the tools you are exploring, learning, and using.</h2>
          <p>
            Organize your development environments, libraries, platforms, services, and utilities.
            Records stay on this device and can connect to your existing lessons, skills, and
            projects.
          </p>
        </div>
        <span className="tools-local-tag">Local-first</span>
      </section>

      <section className="tools-overview" aria-label="Tool status counts">
        {TOOL_STATUSES.map((status) => (
          <button
            className={statusFilter === status ? 'tools-count active' : 'tools-count'}
            type="button"
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
          >
            <b>{countForStatus(status)}</b>
            <span>{label(status)}</span>
          </button>
        ))}
      </section>

      <section className="panel tools-category-overview" aria-label="Tool category counts">
        <div className="tools-section-heading">
          <div>
            <div className="eyebrow">CATEGORIES</div>
            <h2>Where your toolset is growing</h2>
          </div>
          <span className="tools-count-note">{categories.length} categories</span>
        </div>
        <div className="tools-category-list">
          {categories.map((category) => (
            <button
              type="button"
              className={
                categoryFilter === category ? 'tools-category-chip active' : 'tools-category-chip'
              }
              key={category}
              onClick={() => setCategoryFilter(categoryFilter === category ? '' : category)}
            >
              {category}
              <b>{tools.filter((tool) => tool.category === category).length}</b>
            </button>
          ))}
        </div>
      </section>

      <section className="panel tools-section" id="tools-record-form">
        <div className="tools-section-heading">
          <div>
            <div className="eyebrow">{editingId ? 'UPDATE TOOL' : 'TOOL RECORD'}</div>
            <h2>{editingId ? 'Edit tool' : 'Add a tool'}</h2>
          </div>
          <span className="tools-count-note">{canSave ? 'Ready to save' : 'Saving disabled'}</span>
        </div>
        <div className="tools-form-grid">
          <label>
            Name
            <input
              value={draft.name}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="Tool or technology name"
            />
          </label>
          <label>
            Category
            <input
              list="tools-category-options"
              value={draft.category}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              placeholder="Choose or enter a category"
            />
            <datalist id="tools-category-options">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label>
            Official website / documentation URL
            <input
              type="url"
              value={draft.url}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, url: event.target.value })}
              placeholder="https://"
            />
          </label>
          <label>
            Status
            <select
              value={draft.status}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, status: event.target.value as ToolStatus })}
            >
              {TOOL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {label(status)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Priority
            <select
              value={draft.priority}
              disabled={!canSave}
              onChange={(event) =>
                setDraft({ ...draft, priority: event.target.value as ToolPriority })
              }
            >
              {TOOL_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
          <label className="tools-form-wide">
            Short description
            <textarea
              rows={2}
              value={draft.description}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            />
          </label>
          <label className="tools-form-wide">
            Personal notes
            <textarea
              rows={3}
              value={draft.notes}
              disabled={!canSave}
              onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
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
              placeholder="python, deployment, inference"
            />
          </label>
          <div />
          <label>
            Linked lessons
            <select
              multiple
              size={5}
              value={draft.lessonIds}
              disabled={!canSave}
              onChange={(event) => changeLinks(event, 'lessonIds')}
            >
              {draft.lessonIds
                .filter((id) => !TOOL_LESSONS.some((lesson) => lesson.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {TOOL_LESSONS.map((lesson) => (
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
              onChange={(event) => changeLinks(event, 'skillIds')}
            >
              {draft.skillIds
                .filter((id) => !TOOL_SKILLS.some((skill) => skill.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {TOOL_SKILLS.map((skill) => (
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
              onChange={(event) => changeLinks(event, 'projectIds')}
            >
              {draft.projectIds
                .filter((id) => !TOOL_PROJECTS.some((project) => project.id === id))
                .map((id) => (
                  <option key={id} value={id}>
                    {id} · unavailable (retained)
                  </option>
                ))}
              {TOOL_PROJECTS.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.id} · {project.title}
                </option>
              ))}
            </select>
            <small>Use Ctrl/Command to select more than one.</small>
          </label>
        </div>
        <div className="tools-actions">
          <button className="primary" type="button" disabled={!canSave} onClick={saveTool}>
            <Save size={14} /> {editingId ? 'Save changes' : 'Save tool'}
          </button>
          {editingId && (
            <button className="textbtn" type="button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </section>

      <section className="panel tools-section">
        <div className="tools-section-heading">
          <div>
            <div className="eyebrow">TOOLSET</div>
            <h2>Your tools</h2>
          </div>
          <span className="tools-count-note">
            {visibleTools.length} of {tools.length}
          </span>
        </div>
        <div className="tools-filters">
          <label className="tools-search">
            Search tools
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, description, or tags"
            />
          </label>
          <label>
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as ToolStatus | '')}
            >
              <option value="">All statuses</option>
              {TOOL_STATUSES.map((status) => (
                <option value={status} key={status}>
                  {label(status)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option value="recent">Recently updated</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>
        {tools.length === 0 ? (
          <div className="tools-empty">
            <h3>Your toolset starts with what you actually use</h3>
            <p>
              No tools have been added. Record a language, environment, library, platform, or
              service when it becomes relevant to your work.
            </p>
          </div>
        ) : visibleTools.length === 0 ? (
          <div className="tools-empty">
            <h3>No matching tools</h3>
            <p>Adjust your search or filters to see other records.</p>
          </div>
        ) : (
          <div className="tools-record-list">
            {visibleTools.map((tool) => (
              <article className="tools-record" key={tool.id}>
                <div className="tools-record-main">
                  <div className="tools-record-meta">
                    <span className="tools-category-label">{tool.category}</span>
                    <span className={`tools-status ${tool.status}`}>{label(tool.status)}</span>
                    <span className={`tools-priority ${tool.priority}`}>
                      {tool.priority} priority
                    </span>
                  </div>
                  <h3>{tool.name}</h3>
                  <p>{tool.description || 'No description provided.'}</p>
                  <div className="tools-record-dates">
                    Added {tool.dateAdded} · Updated{' '}
                    {new Date(tool.lastUpdated).toLocaleDateString()}
                  </div>
                  {tool.tags.length > 0 && (
                    <div className="tools-tags">
                      {tool.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <details className="tools-details">
                    <summary>Notes and linked work</summary>
                    <div className="tools-details-body">
                      <p>
                        <b>Personal notes</b>
                        <br />
                        {tool.notes || 'No personal notes yet.'}
                      </p>
                      <b>Lessons</b>
                      {tool.lessonIds.length ? (
                        <div className="tools-link-list">
                          {tool.lessonIds.map((id) =>
                            TOOL_LESSONS.some((lesson) => lesson.id === id) ? (
                              <button
                                className="textbtn"
                                type="button"
                                key={id}
                                onClick={() => onOpenLesson(id)}
                              >
                                <BookOpen size={13} /> {lessonTitle(id)}
                              </button>
                            ) : (
                              <span className="tools-unavailable" key={id}>
                                {id} (unavailable)
                              </span>
                            ),
                          )}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                      <b>Career skills</b>
                      {tool.skillIds.length ? (
                        <div className="tools-link-list">
                          {tool.skillIds.map((id) =>
                            TOOL_SKILLS.some((skill) => skill.id === id) ? (
                              <button
                                className="textbtn"
                                type="button"
                                key={id}
                                onClick={onOpenSkill}
                              >
                                {skillTitle(id)}
                              </button>
                            ) : (
                              <span className="tools-unavailable" key={id}>
                                {id} (unavailable)
                              </span>
                            ),
                          )}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                      <b>Projects</b>
                      {tool.projectIds.length ? (
                        <div className="tools-link-list">
                          {tool.projectIds.map((id) =>
                            TOOL_PROJECTS.some((project) => project.id === id) ? (
                              <button
                                className="textbtn"
                                type="button"
                                key={id}
                                onClick={() => onOpenProject(id as ProjectId)}
                              >
                                <FolderKanban size={13} /> {id} · {projectTitle(id)}
                              </button>
                            ) : (
                              <span className="tools-unavailable" key={id}>
                                {id} (unavailable)
                              </span>
                            ),
                          )}
                        </div>
                      ) : (
                        <small>None linked</small>
                      )}
                    </div>
                  </details>
                </div>
                <div className="tools-record-actions">
                  <a
                    className="outline tools-official-link"
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} /> Official site
                  </a>
                  <button
                    className="textbtn"
                    type="button"
                    disabled={!canSave}
                    onClick={() => editTool(tool)}
                  >
                    Edit
                  </button>
                  {tool.status === 'archived' ? (
                    <button
                      className="textbtn"
                      type="button"
                      disabled={!canSave}
                      onClick={() => updateStatus(tool, 'not-explored')}
                    >
                      <RotateCcw size={13} /> Restore
                    </button>
                  ) : (
                    <button
                      className="textbtn"
                      type="button"
                      disabled={!canSave}
                      onClick={() => updateStatus(tool, 'archived')}
                    >
                      <Archive size={13} /> Archive
                    </button>
                  )}
                  <button
                    className="iconbtn"
                    type="button"
                    disabled={!canSave}
                    aria-label={`Delete ${tool.name}`}
                    onClick={() => deleteTool(tool)}
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
