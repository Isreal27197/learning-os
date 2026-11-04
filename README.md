# Learning OS — personal technical learning workspace

A local-first React + TypeScript web app personalized around a path from beginner Python to ML Systems, Inference Engineering and AI Infrastructure.

## Run locally

1. Install Node.js 20 or newer.
2. Unzip this project and open a terminal in the project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Current functionality

- Personalized curriculum structure and lesson navigation
- Mark lessons complete and track progress
- Study diary with daily reflections
- Study timer with saved sessions
- Goals and project ladder
- JSON export of local learning data
- Responsive desktop/mobile layout
- Optional Supabase authentication hook

## Important: local-first prototype vs cloud account

Without Supabase credentials, data is stored in this browser's `localStorage`. It remains on this device/browser and is not a secure account or cross-device sync. Export regularly.

To enable real authentication:

1. Create a Supabase project.
2. Copy `.env.example` to `.env`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Enable email/password authentication in Supabase.
5. Restart the dev server.

The current starter includes the authentication UI hook. Before production, add database tables, row-level security policies, and sync for diary entries, goals, sessions and lesson progress. Never put a Supabase service-role key in the frontend.

## Personalization decisions

- Prioritize Python, Linux/Git, SQL, mathematics, classical ML, PyTorch, MLOps, distributed systems and inference engineering.
- Keep TensorFlow as optional rather than a parallel core framework.
- Defer CUDA/kernel specialization, advanced LLM research and distributed GPU inference until prerequisites are solid.
- The initial curriculum is a sequence proposal, not a claim that all modules are already fully authored. Each lesson still needs its complete teaching content, diagrams, assignments, assessments and verified external references.
