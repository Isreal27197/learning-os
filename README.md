# Learning OS

**A personal technical learning workspace for building skills, completing projects, and preparing for a career in technology.**

Learning OS is a local-first web application built with React, TypeScript, and Vite. It is designed to connect structured learning with practical execution and measurable progress.

Its initial learning direction focuses on Python, mathematics, machine learning, ML systems, inference engineering, and AI infrastructure.

## What It Does

Learning OS brings several parts of a technical learning journey into one workspace:

- **Curriculum:** Organize learning paths, stages, lessons, and learning objectives.
- **Lessons:** Study structured technical content with explanations, examples, exercises, and self-checks.
- **Progress:** Track lesson progress and learning activity.
- **Study Sessions:** Use a study timer and maintain a record of sessions.
- **Study Diary:** Record daily reflections and learning experiences.
- **Labs:** Work through practical exercises and learning activities.
- **Goals & Projects:** Organize technical goals and project work.
- **Career Preparation:** Track skills, evidence, applications, and career milestones.
- **Library:** Keep useful learning resources accessible.
- **Tools:** Access supporting utilities for the learning workflow.
- **Data Export:** Export locally stored learning data as JSON.

The central idea is to connect:

**Learn → Practice → Build → Record Evidence → Review → Improve**

Progress should reflect actual learning and practical work, not simply time spent reading.

## Technology Stack

- React 18
- TypeScript
- Vite
- CSS
- LocalStorage
- Supabase JavaScript client (optional authentication integration)

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- Git (recommended)

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd learning-os
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

Run the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
learning-os/
├── scripts/
│   ├── baselines/
│   └── generate-outline.mjs
├── src/
│   ├── components/
│   ├── curriculum/
│   ├── lessons/
│   ├── App.tsx
│   └── data.ts
├── public/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Curriculum Architecture

The curriculum separates lesson metadata from detailed lesson content.

- `src/data.ts` contains curriculum stages and lesson metadata.
- `src/lessons/` contains individual lesson content files.
- `src/curriculum/` contains curriculum types, lesson-loading logic, and generated files.

To regenerate curriculum files:

```bash
npm run generate:outline
```

To check that generated files are current:

```bash
npm run check:outline
```

The production build runs this check before compiling the application.

## Data Storage and Privacy

Learning OS currently follows a local-first approach.

Learning records are stored in the browser's `localStorage`. This means:

- Data remains in the browser where it was created.
- Data does not automatically synchronize across browsers or devices.
- Clearing browser storage can remove locally saved learning records.
- Important records should be exported regularly.

The application includes an optional Supabase authentication integration. However, authentication should not be confused with complete cloud data persistence.

A production cloud experience would still require database tables, appropriate Row Level Security policies, and synchronization for learning records, goals, study sessions, and progress.

Never expose a Supabase service-role key in frontend code.

## Deployment

Learning OS can be deployed as a static frontend using services such as Netlify.

For a standard Vite deployment, use:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Base directory | Project root |

The application currently uses browser-local storage, so deploying it does not automatically create cross-device synchronization or cloud accounts.

## Development Philosophy

Learning OS is being developed around a few principles:

1. **Learning through practice:** Understanding should be supported by exercises and implementation.
2. **Evidence over appearance:** Progress should reflect completed work and demonstrated understanding.
3. **Structured progression:** Build foundations before advancing to more complex systems.
4. **Incremental development:** Add features without compromising existing functionality.
5. **Personal ownership:** Keep the learning process, records, projects, and goals connected in one workspace.

## Learning Direction

The initial technical learning direction prioritizes:

- Python and programming fundamentals
- Linux, Git, and terminal workflows
- SQL and data handling
- Mathematics for machine learning
- Classical machine learning
- Deep learning and PyTorch
- Software engineering for ML
- MLOps and deployment
- Distributed systems
- ML systems and inference engineering
- AI infrastructure

This is an evolving learning environment. Curriculum content, projects, and capabilities will continue to develop as the application grows.

---

**Learning OS — Learn deliberately. Build consistently. Keep evidence of progress.**

https://learning-os-isreal.netlify.app/
