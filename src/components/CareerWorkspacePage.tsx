import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ExternalLink, FolderKanban, Plus, Save, Trash2 } from 'lucide-react';
import {
  APPLICATION_STATUSES,
  CAREER_MILESTONE_STATUSES,
  CAREER_SKILLS,
  CAREER_SKILL_STATUSES,
  EVIDENCE_TYPES,
  type ApplicationStatus,
  type CareerMilestone,
  type CareerMilestoneStatus,
  type CareerOpportunity,
  type CareerProfile,
  type CareerSkill,
  type CareerSkillStatus,
  type CareerWorkspaceData,
  type EvidenceType,
  type PortfolioEvidence,
} from '../lib/career';
import { PROJECT_LADDER, type ProjectId } from '../projectLadder';
import type { SaveResult } from '../lib/storage';

type CareerWorkspacePageProps = {
  data: CareerWorkspaceData;
  canSave: boolean;
  storageError?: string;
  onSave: (data: CareerWorkspaceData) => SaveResult;
  onOpenLesson: (lessonId: string) => void;
  onOpenProject: (projectId: ProjectId) => void;
};

type EvidenceDraft = Omit<PortfolioEvidence, 'id' | 'createdAt' | 'updatedAt'>;
type OpportunityDraft = Omit<CareerOpportunity, 'id' | 'createdAt' | 'updatedAt'>;
type MilestoneDraft = Omit<CareerMilestone, 'id' | 'createdAt' | 'updatedAt'>;

const emptyEvidence: EvidenceDraft = {
  title: '',
  skillId: '',
  type: 'project',
  description: '',
  link: '',
  date: '',
};
const emptyOpportunity: OpportunityDraft = {
  company: '',
  role: '',
  location: '',
  applicationLink: '',
  deadline: '',
  applicationDate: '',
  status: 'interested',
  notes: '',
  followUpDate: '',
};
const emptyMilestone: MilestoneDraft = {
  title: '',
  description: '',
  targetDate: '',
  status: 'not-started',
};
const statusLabel = (value: string) => value.replace(/-/g, ' ');

export default function CareerWorkspacePage({
  data,
  canSave,
  storageError,
  onSave,
  onOpenLesson,
  onOpenProject,
}: CareerWorkspacePageProps) {
  const [profileDraft, setProfileDraft] = useState<CareerProfile>(data.profile);
  const [skillDrafts, setSkillDrafts] = useState<Record<string, CareerSkill>>(() =>
    Object.fromEntries(data.skills.map((skill) => [skill.skillId, skill])),
  );
  const [evidenceDraft, setEvidenceDraft] = useState<EvidenceDraft>(emptyEvidence);
  const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);
  const [opportunityDraft, setOpportunityDraft] = useState<OpportunityDraft>(emptyOpportunity);
  const [editingOpportunityId, setEditingOpportunityId] = useState<string | null>(null);
  const [milestoneDraft, setMilestoneDraft] = useState<MilestoneDraft>(emptyMilestone);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setProfileDraft(data.profile);
  }, [data.profile]);

  const categories = useMemo(() => [...new Set(CAREER_SKILLS.map((skill) => skill.category))], []);
  const statusCounts = useMemo(
    () =>
      Object.fromEntries(
        APPLICATION_STATUSES.map((status) => [
          status,
          data.opportunities.filter((item) => item.status === status).length,
        ]),
      ) as Record<ApplicationStatus, number>,
    [data.opportunities],
  );

  const persist = (
    update: (current: CareerWorkspaceData) => CareerWorkspaceData,
    success: string,
  ): SaveResult => {
    if (!canSave) {
      const result = { ok: false as const, error: 'Career storage is unavailable or invalid.' };
      setFeedback(result.error);
      return result;
    }
    const result = onSave(update(data));
    setFeedback(result.ok ? success : `Could not save career data: ${result.error}`);
    return result;
  };

  const saveProfile = () =>
    persist((current) => ({ ...current, profile: { ...profileDraft } }), 'Career direction saved.');

  const saveSkill = (skillId: string) => {
    const draft = skillDrafts[skillId];
    if (!draft) return;
    if (
      draft.status === 'demonstrated' &&
      !draft.evidence.trim() &&
      !data.evidence.some((item) => item.skillId === skillId)
    ) {
      setFeedback('Add explicit evidence before marking a skill demonstrated.');
      return;
    }
    persist(
      (current) => ({
        ...current,
        skills: current.skills.map((skill) => (skill.skillId === skillId ? draft : skill)),
      }),
      'Skill record saved.',
    );
  };

  const updateSkillDraft = (skillId: string, update: Partial<CareerSkill>) => {
    setSkillDrafts((current) => ({
      ...current,
      [skillId]: { ...current[skillId], ...update },
    }));
  };

  const beginEvidenceEdit = (record: PortfolioEvidence) => {
    setEditingEvidenceId(record.id);
    setEvidenceDraft({
      title: record.title,
      skillId: record.skillId,
      ...(record.projectId ? { projectId: record.projectId } : {}),
      type: record.type,
      description: record.description,
      link: record.link,
      date: record.date,
    });
  };
  const saveEvidence = () => {
    if (
      !evidenceDraft.title.trim() ||
      !evidenceDraft.skillId ||
      !evidenceDraft.date ||
      !evidenceDraft.description.trim()
    ) {
      setFeedback('Evidence needs a title, skill, description, and date.');
      return;
    }
    const existing = data.evidence.find((item) => item.id === editingEvidenceId);
    const now = new Date().toISOString();
    const { projectId, ...evidenceFields } = evidenceDraft;
    const record: PortfolioEvidence = {
      ...evidenceFields,
      ...(projectId ? { projectId } : {}),
      title: evidenceDraft.title.trim(),
      description: evidenceDraft.description.trim(),
      link: evidenceDraft.link.trim(),
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const result = persist(
      (current) => ({
        ...current,
        evidence: existing
          ? current.evidence.map((item) => (item.id === existing.id ? record : item))
          : [record, ...current.evidence],
      }),
      existing ? 'Evidence updated.' : 'Evidence added.',
    );
    if (result.ok) {
      setEditingEvidenceId(null);
      setEvidenceDraft(emptyEvidence);
    }
  };
  const deleteEvidence = (record: PortfolioEvidence) => {
    if (!window.confirm(`Delete “${record.title}” evidence?`)) return;
    persist(
      (current) => ({
        ...current,
        evidence: current.evidence.filter((item) => item.id !== record.id),
      }),
      'Evidence deleted.',
    );
  };

  const beginOpportunityEdit = (record: CareerOpportunity) => {
    setEditingOpportunityId(record.id);
    setOpportunityDraft({
      company: record.company,
      role: record.role,
      location: record.location,
      applicationLink: record.applicationLink,
      deadline: record.deadline,
      applicationDate: record.applicationDate,
      status: record.status,
      notes: record.notes,
      followUpDate: record.followUpDate,
    });
  };
  const saveOpportunity = () => {
    if (!opportunityDraft.company.trim() || !opportunityDraft.role.trim()) {
      setFeedback('Enter a company and role before saving an opportunity.');
      return;
    }
    const existing = data.opportunities.find((item) => item.id === editingOpportunityId);
    const now = new Date().toISOString();
    const record: CareerOpportunity = {
      ...opportunityDraft,
      company: opportunityDraft.company.trim(),
      role: opportunityDraft.role.trim(),
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const result = persist(
      (current) => ({
        ...current,
        opportunities: existing
          ? current.opportunities.map((item) => (item.id === existing.id ? record : item))
          : [record, ...current.opportunities],
      }),
      existing ? 'Opportunity updated.' : 'Opportunity added.',
    );
    if (result.ok) {
      setEditingOpportunityId(null);
      setOpportunityDraft(emptyOpportunity);
    }
  };
  const deleteOpportunity = (record: CareerOpportunity) => {
    if (!window.confirm(`Delete the ${record.role} opportunity at ${record.company}?`)) return;
    persist(
      (current) => ({
        ...current,
        opportunities: current.opportunities.filter((item) => item.id !== record.id),
      }),
      'Opportunity deleted.',
    );
  };

  const beginMilestoneEdit = (record: CareerMilestone) => {
    setEditingMilestoneId(record.id);
    setMilestoneDraft({
      title: record.title,
      description: record.description,
      targetDate: record.targetDate,
      status: record.status,
      ...(record.skillId ? { skillId: record.skillId } : {}),
      ...(record.projectId ? { projectId: record.projectId } : {}),
    });
  };
  const saveMilestone = () => {
    if (!milestoneDraft.title.trim()) {
      setFeedback('Enter a milestone title before saving.');
      return;
    }
    const existing = data.milestones.find((item) => item.id === editingMilestoneId);
    const now = new Date().toISOString();
    const { skillId, projectId, ...milestoneFields } = milestoneDraft;
    const record: CareerMilestone = {
      ...milestoneFields,
      title: milestoneDraft.title.trim(),
      description: milestoneDraft.description.trim(),
      ...(skillId ? { skillId } : {}),
      ...(projectId ? { projectId } : {}),
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const result = persist(
      (current) => ({
        ...current,
        milestones: existing
          ? current.milestones.map((item) => (item.id === existing.id ? record : item))
          : [record, ...current.milestones],
      }),
      existing ? 'Milestone updated.' : 'Milestone added.',
    );
    if (result.ok) {
      setEditingMilestoneId(null);
      setMilestoneDraft(emptyMilestone);
    }
  };
  const deleteMilestone = (record: CareerMilestone) => {
    if (!window.confirm(`Delete the “${record.title}” milestone?`)) return;
    persist(
      (current) => ({
        ...current,
        milestones: current.milestones.filter((item) => item.id !== record.id),
      }),
      'Milestone deleted.',
    );
  };

  const cancelEvidence = () => {
    setEditingEvidenceId(null);
    setEvidenceDraft(emptyEvidence);
  };
  const cancelOpportunity = () => {
    setEditingOpportunityId(null);
    setOpportunityDraft(emptyOpportunity);
  };
  const cancelMilestone = () => {
    setEditingMilestoneId(null);
    setMilestoneDraft(emptyMilestone);
  };

  return (
    <div className="career-workspace">
      {storageError && (
        <p className="career-warning" role="alert">
          {storageError}
        </p>
      )}
      {feedback && (
        <p className="career-feedback" role="status">
          {feedback}
        </p>
      )}

      <section className="panel career-intro">
        <div>
          <div className="eyebrow">DIRECTION · SKILLS · EVIDENCE</div>
          <h2>Connect what you are learning to the work you want to do.</h2>
          <p>
            Keep a private, local record of your career direction, explicit skills evidence, and
            manually tracked opportunities.
          </p>
        </div>
        <span className="career-local-tag">Saved on this device</span>
      </section>

      <section className="panel career-section">
        <div className="career-heading">
          <div>
            <div className="eyebrow">CAREER DIRECTION</div>
            <h2>Set your current direction</h2>
          </div>
        </div>
        <div className="career-form-grid">
          <label>
            Target role
            <input
              value={profileDraft.targetRole}
              disabled={!canSave}
              onChange={(event) =>
                setProfileDraft({ ...profileDraft, targetRole: event.target.value })
              }
              placeholder="e.g. ML Systems Engineer"
            />
          </label>
          <label>
            Target internship date
            <input
              type="date"
              value={profileDraft.targetInternshipDate}
              disabled={!canSave}
              onChange={(event) =>
                setProfileDraft({ ...profileDraft, targetInternshipDate: event.target.value })
              }
            />
          </label>
          <label className="career-form-wide">
            Career focus
            <textarea
              value={profileDraft.careerFocus}
              disabled={!canSave}
              onChange={(event) =>
                setProfileDraft({ ...profileDraft, careerFocus: event.target.value })
              }
              rows={3}
              placeholder="What kind of problems, teams, or technologies do you want to focus on?"
            />
          </label>
          <label className="career-form-wide">
            Career notes
            <textarea
              value={profileDraft.notes}
              disabled={!canSave}
              onChange={(event) => setProfileDraft({ ...profileDraft, notes: event.target.value })}
              rows={4}
            />
          </label>
        </div>
        <button className="primary" type="button" disabled={!canSave} onClick={saveProfile}>
          <Save size={15} /> Save direction
        </button>
      </section>

      <section className="panel career-section">
        <div className="career-heading">
          <div>
            <div className="eyebrow">SKILLS MAP</div>
            <h2>Track learning, practice, and evidence</h2>
          </div>
          <span className="career-count">
            {data.skills.filter((skill) => skill.status === 'demonstrated').length} demonstrated
            with evidence
          </span>
        </div>
        <p className="career-helper">
          Lesson completion never changes a skill status. To mark a skill demonstrated, provide
          specific evidence or first add a linked portfolio record.
        </p>
        <div className="career-skill-categories">
          {categories.map((category) => (
            <section className="career-skill-category" key={category}>
              <h3>{category}</h3>
              {CAREER_SKILLS.filter((skill) => skill.category === category).map((definition) => {
                const skill = skillDrafts[definition.id];
                const savedSkill = data.skills.find((item) => item.skillId === definition.id);
                const hasPortfolioEvidence = data.evidence.some(
                  (item) => item.skillId === definition.id,
                );
                const unchanged =
                  skill.status === savedSkill?.status &&
                  skill.notes === savedSkill?.notes &&
                  skill.evidence === savedSkill?.evidence;
                return (
                  <article className="career-skill" key={definition.id}>
                    <div className="career-skill-head">
                      <b>{definition.name}</b>
                      <span className={`career-skill-status ${skill.status}`}>
                        {statusLabel(skill.status)}
                      </span>
                    </div>
                    <label>
                      Status
                      <select
                        value={skill.status}
                        disabled={!canSave}
                        onChange={(event) =>
                          updateSkillDraft(definition.id, {
                            status: event.target.value as CareerSkillStatus,
                          })
                        }
                      >
                        {CAREER_SKILL_STATUSES.map((status) => (
                          <option value={status} key={status}>
                            {statusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Notes
                      <textarea
                        value={skill.notes}
                        disabled={!canSave}
                        onChange={(event) =>
                          updateSkillDraft(definition.id, { notes: event.target.value })
                        }
                        rows={2}
                      />
                    </label>
                    {skill.status === 'demonstrated' && (
                      <label>
                        Demonstration evidence
                        <textarea
                          value={skill.evidence}
                          disabled={!canSave}
                          onChange={(event) =>
                            updateSkillDraft(definition.id, { evidence: event.target.value })
                          }
                          rows={2}
                          placeholder={
                            hasPortfolioEvidence
                              ? 'Describe your evidence, or cite your portfolio record.'
                              : 'Describe specific work that demonstrates this skill.'
                          }
                        />
                      </label>
                    )}
                    <div className="career-links">
                      {definition.lessonId && (
                        <button
                          className="textbtn"
                          type="button"
                          onClick={() => onOpenLesson(definition.lessonId!)}
                        >
                          <BookOpen size={13} /> Roadmap lesson
                        </button>
                      )}
                      {definition.projectId && (
                        <button
                          className="textbtn"
                          type="button"
                          onClick={() => onOpenProject(definition.projectId!)}
                        >
                          <FolderKanban size={13} /> {definition.projectId} project
                        </button>
                      )}
                    </div>
                    {!unchanged && (
                      <button
                        className="outline career-save-skill"
                        type="button"
                        disabled={!canSave}
                        onClick={() => saveSkill(definition.id)}
                      >
                        Save skill
                      </button>
                    )}
                  </article>
                );
              })}
            </section>
          ))}
        </div>
      </section>

      <section className="panel career-section">
        <div className="career-heading">
          <div>
            <div className="eyebrow">PORTFOLIO EVIDENCE</div>
            <h2>Record practical work</h2>
          </div>
          <span className="career-count">{data.evidence.length} records</span>
        </div>
        <div className="career-editor">
          <h3>{editingEvidenceId ? 'Edit evidence' : 'Add evidence'}</h3>
          <div className="career-form-grid">
            <label>
              Evidence title
              <input
                value={evidenceDraft.title}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, title: event.target.value })
                }
              />
            </label>
            <label>
              Related skill
              <select
                value={evidenceDraft.skillId}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, skillId: event.target.value })
                }
              >
                <option value="">Select a skill</option>
                {CAREER_SKILLS.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Evidence type
              <select
                value={evidenceDraft.type}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, type: event.target.value as EvidenceType })
                }
              >
                {EVIDENCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {statusLabel(type)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Related project (optional)
              <select
                value={evidenceDraft.projectId ?? ''}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({
                    ...evidenceDraft,
                    projectId: (event.target.value || undefined) as ProjectId | undefined,
                  })
                }
              >
                <option value="">No project</option>
                {PROJECT_LADDER.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.id} · {project.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                value={evidenceDraft.date}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, date: event.target.value })
                }
              />
            </label>
            <label>
              Link (optional)
              <input
                type="url"
                value={evidenceDraft.link}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, link: event.target.value })
                }
                placeholder="https://"
              />
            </label>
            <label className="career-form-wide">
              Description
              <textarea
                value={evidenceDraft.description}
                disabled={!canSave}
                onChange={(event) =>
                  setEvidenceDraft({ ...evidenceDraft, description: event.target.value })
                }
                rows={3}
              />
            </label>
          </div>
          <div className="career-actions">
            <button className="primary" type="button" disabled={!canSave} onClick={saveEvidence}>
              <Save size={14} /> Save evidence
            </button>
            {editingEvidenceId && (
              <button className="textbtn" type="button" onClick={cancelEvidence}>
                Cancel edit
              </button>
            )}
          </div>
        </div>
        {data.evidence.length ? (
          <div className="career-record-list">
            {data.evidence.map((record) => (
              <article className="career-record" key={record.id}>
                <div>
                  <span className="career-record-type">
                    {statusLabel(record.type)} · {record.date}
                  </span>
                  <h3>{record.title}</h3>
                  <p>{record.description}</p>
                  <small>
                    {CAREER_SKILLS.find((skill) => skill.id === record.skillId)?.name}
                    {record.projectId ? ` · ${record.projectId}` : ''}
                  </small>
                  {record.link && (
                    <a href={record.link} target="_blank" rel="noreferrer">
                      <ExternalLink size={13} /> Open evidence link
                    </a>
                  )}
                </div>
                <div className="career-record-actions">
                  <button
                    className="textbtn"
                    type="button"
                    disabled={!canSave}
                    onClick={() => beginEvidenceEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="iconbtn"
                    type="button"
                    disabled={!canSave}
                    aria-label={`Delete ${record.title}`}
                    onClick={() => deleteEvidence(record)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted">
            No portfolio evidence yet. Add a link or description of work you have actually
            completed.
          </p>
        )}
      </section>

      <section className="panel career-section">
        <div className="career-heading">
          <div>
            <div className="eyebrow">INTERNSHIP & APPLICATION TRACKER</div>
            <h2>Track opportunities you add</h2>
          </div>
          <span className="career-count">{data.opportunities.length} opportunities</span>
        </div>
        <div className="career-status-summary">
          {APPLICATION_STATUSES.map((status) => (
            <div key={status}>
              <b>{statusCounts[status]}</b>
              <span>{statusLabel(status)}</span>
            </div>
          ))}
        </div>
        <div className="career-editor">
          <h3>{editingOpportunityId ? 'Edit opportunity' : 'Add an opportunity'}</h3>
          <div className="career-form-grid">
            <label>
              Company
              <input
                value={opportunityDraft.company}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, company: event.target.value })
                }
              />
            </label>
            <label>
              Role
              <input
                value={opportunityDraft.role}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, role: event.target.value })
                }
              />
            </label>
            <label>
              Location
              <input
                value={opportunityDraft.location}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, location: event.target.value })
                }
              />
            </label>
            <label>
              Application link
              <input
                type="url"
                value={opportunityDraft.applicationLink}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, applicationLink: event.target.value })
                }
                placeholder="https://"
              />
            </label>
            <label>
              Deadline
              <input
                type="date"
                value={opportunityDraft.deadline}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, deadline: event.target.value })
                }
              />
            </label>
            <label>
              Application date
              <input
                type="date"
                value={opportunityDraft.applicationDate}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, applicationDate: event.target.value })
                }
              />
            </label>
            <label>
              Status
              <select
                value={opportunityDraft.status}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({
                    ...opportunityDraft,
                    status: event.target.value as ApplicationStatus,
                  })
                }
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option value={status} key={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Follow-up date
              <input
                type="date"
                value={opportunityDraft.followUpDate}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, followUpDate: event.target.value })
                }
              />
            </label>
            <label className="career-form-wide">
              Notes
              <textarea
                value={opportunityDraft.notes}
                disabled={!canSave}
                onChange={(event) =>
                  setOpportunityDraft({ ...opportunityDraft, notes: event.target.value })
                }
                rows={3}
              />
            </label>
          </div>
          <div className="career-actions">
            <button className="primary" type="button" disabled={!canSave} onClick={saveOpportunity}>
              <Plus size={14} /> Save opportunity
            </button>
            {editingOpportunityId && (
              <button className="textbtn" type="button" onClick={cancelOpportunity}>
                Cancel edit
              </button>
            )}
          </div>
        </div>
        {data.opportunities.length ? (
          <div className="career-record-list">
            {data.opportunities.map((record) => (
              <article className="career-record" key={record.id}>
                <div>
                  <span className={`career-record-type ${record.status}`}>
                    {statusLabel(record.status)}
                  </span>
                  <h3>
                    {record.role} · {record.company}
                  </h3>
                  <p>
                    {record.location || 'Location not specified'}
                    {record.deadline ? ` · Deadline ${record.deadline}` : ''}
                    {record.followUpDate ? ` · Follow up ${record.followUpDate}` : ''}
                  </p>
                  {record.notes && <small>{record.notes}</small>}
                  {record.applicationLink && (
                    <a href={record.applicationLink} target="_blank" rel="noreferrer">
                      <ExternalLink size={13} /> Application link
                    </a>
                  )}
                </div>
                <div className="career-record-actions">
                  <button
                    className="textbtn"
                    type="button"
                    disabled={!canSave}
                    onClick={() => beginOpportunityEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="iconbtn"
                    type="button"
                    disabled={!canSave}
                    aria-label={`Delete ${record.role} at ${record.company}`}
                    onClick={() => deleteOpportunity(record)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted">
            No opportunities recorded. Add one when you find a role worth tracking.
          </p>
        )}
      </section>

      <section className="panel career-section">
        <div className="career-heading">
          <div>
            <div className="eyebrow">CAREER MILESTONES</div>
            <h2>Track preparation steps</h2>
          </div>
          <span className="career-count">
            {data.milestones.filter((item) => item.status === 'completed').length}/
            {data.milestones.length} completed
          </span>
        </div>
        <div className="career-editor">
          <h3>{editingMilestoneId ? 'Edit milestone' : 'Add a milestone'}</h3>
          <div className="career-form-grid">
            <label>
              Title
              <input
                value={milestoneDraft.title}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({ ...milestoneDraft, title: event.target.value })
                }
              />
            </label>
            <label>
              Target date
              <input
                type="date"
                value={milestoneDraft.targetDate}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({ ...milestoneDraft, targetDate: event.target.value })
                }
              />
            </label>
            <label>
              Status
              <select
                value={milestoneDraft.status}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({
                    ...milestoneDraft,
                    status: event.target.value as CareerMilestoneStatus,
                  })
                }
              >
                {CAREER_MILESTONE_STATUSES.map((status) => (
                  <option value={status} key={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Related skill (optional)
              <select
                value={milestoneDraft.skillId ?? ''}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({ ...milestoneDraft, skillId: event.target.value || undefined })
                }
              >
                <option value="">No skill link</option>
                {CAREER_SKILLS.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Related project (optional)
              <select
                value={milestoneDraft.projectId ?? ''}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({
                    ...milestoneDraft,
                    projectId: (event.target.value || undefined) as ProjectId | undefined,
                  })
                }
              >
                <option value="">No project link</option>
                {PROJECT_LADDER.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.id} · {project.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="career-form-wide">
              Description
              <textarea
                value={milestoneDraft.description}
                disabled={!canSave}
                onChange={(event) =>
                  setMilestoneDraft({ ...milestoneDraft, description: event.target.value })
                }
                rows={3}
              />
            </label>
          </div>
          <div className="career-actions">
            <button className="primary" type="button" disabled={!canSave} onClick={saveMilestone}>
              <Plus size={14} /> Save milestone
            </button>
            {editingMilestoneId && (
              <button className="textbtn" type="button" onClick={cancelMilestone}>
                Cancel edit
              </button>
            )}
          </div>
        </div>
        {data.milestones.length ? (
          <div className="career-record-list">
            {data.milestones.map((record) => (
              <article className="career-record" key={record.id}>
                <div>
                  <span className={`career-record-type ${record.status}`}>
                    {statusLabel(record.status)}
                    {record.targetDate ? ` · target ${record.targetDate}` : ''}
                  </span>
                  <h3>{record.title}</h3>
                  <p>{record.description}</p>
                  <small>
                    {record.skillId
                      ? CAREER_SKILLS.find((skill) => skill.id === record.skillId)?.name
                      : ''}
                    {record.skillId && record.projectId ? ' · ' : ''}
                    {record.projectId ?? ''}
                  </small>
                </div>
                <div className="career-record-actions">
                  <button
                    className="textbtn"
                    type="button"
                    disabled={!canSave}
                    onClick={() => beginMilestoneEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="iconbtn"
                    type="button"
                    disabled={!canSave}
                    aria-label={`Delete ${record.title}`}
                    onClick={() => deleteMilestone(record)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted">
            No milestones yet. Add a preparation step you choose; no achievements are prefilled.
          </p>
        )}
      </section>
    </div>
  );
}
