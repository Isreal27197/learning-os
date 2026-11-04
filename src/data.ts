export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ResourceType = 'article' | 'documentation' | 'video' | 'paper' | 'book' | 'course';

export type CurriculumResource = {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  explanation: string;
};

export type ImageMedia = {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
};

export type VideoMedia = {
  type: 'video';
  provider: 'youtube';
  videoId: string;
  title: string;
  watchUrl: string;
  caption?: string;
  startSeconds?: number;
  credit?: string;
};

export type LessonMedia = ImageMedia | VideoMedia;

// Video placeholder example only; do not add until the video ID is verified:
// { type: 'video', provider: 'youtube', videoId: '<verified-id>', title: 'Video title', watchUrl: 'https://www.youtube.com/watch?v=<verified-id>' }

export type ContentSection = {
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  media?: LessonMedia[];
};

export type CodeExample = {
  title: string;
  code: string;
  language?: string;
  explanation: string;
};

export type WorkedExample = {
  title: string;
  explanation: string;
  problem?: string;
  reasoning?: string;
  solution?: string;
  code?: string;
  language?: string;
  media?: LessonMedia[];
};

export type CurriculumExercise = {
  id: string;
  title: string;
  instructions: string;
  difficulty: LessonDifficulty;
  expectedOutcomes: string[];
  acceptanceCriteria: string[];
  constraints?: string[];
  testCases?: string[];
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  expectedAnswer?: string;
  explanation?: string;
};

export type CommonMistake = {
  title: string;
  explanation: string;
  incorrectCode?: string;
  correctedCode?: string;
};

export type LessonMiniBuild = {
  title: string;
  goal: string;
  requirements: string[];
  milestones: string[];
  acceptanceCriteria: string[];
  testCases: string[];
};

export type Lesson = {
  id: string;
  title: string;
  detail: string;
  status: 'current' | 'next' | 'later';
  category: string;
  difficulty?: LessonDifficulty;
  learningObjectives?: string[];
  prerequisites?: string[];
  keyConcepts?: string[];
  contentSections?: ContentSection[];
  workedExamples?: WorkedExample[];
  commonMistakes?: (string | CommonMistake)[];
  interviewRelevance?: string;
  resources?: CurriculumResource[];
  exercises?: CurriculumExercise[];
  assessmentQuestions?: AssessmentQuestion[];
  masteryCriteria?: string[];
  miniBuild?: LessonMiniBuild;
  relatedProjectIds?: string[];
  relatedLabActivityIds?: string[];
  relatedTools?: string[];
  featuredMedia?: LessonMedia[];
};

export type CurriculumStage = {
  id: string;
  name: string;
  tag: string;
  description: string;
  lessons: Lesson[];
};

export const stages: CurriculumStage[] = [
  {
    id: 'python-computing-foundations',
    name: 'Python & Computing Foundations',
    tag: 'START HERE',
    description: 'Become comfortable writing, debugging and structuring small programs.',
    lessons: [
      {
        id: 'py-1',
        title: 'Python fundamentals and problem solving',
        detail:
          'Run small Python programs, use values and input, make decisions, repeat work with loops, collect values in lists, define functions and debug beginner problems.',
        status: 'current' as const,
        category: 'Python',
      },
      {
        id: 'py-2',
        title: 'Files, exceptions and modules',
        detail: 'Read and write files, handle errors, import modules and organize small programs.',
        status: 'next' as const,
        category: 'Python',
      },
      {
        id: 'py-3',
        title: 'Git, Terminal and Linux Basics',
        detail:
          'Use a terminal to navigate files, run Python programs, and build a safe beginner Git workflow across Linux, macOS and Windows.',
        status: 'later' as const,
        category: 'Systems',
      },
      {
        id: 'py-4',
        title: 'SQL and Data Handling',
        detail:
          'Model related data in relational tables, query and update it safely with SQL, and use Python with SQLite to inspect and prepare small datasets.',
        status: 'later' as const,
        category: 'Data',
      },
    ],
  },
  {
    id: 'mathematics-for-ml',
    name: 'Mathematics for ML',
    tag: 'FOUNDATIONS',
    description: 'Build mathematical intuition alongside implementation.',
    lessons: [
      {
        id: 'math-1',
        title: 'Functions, sets and notation',
        detail: 'Domains, ranges, mappings, set operations and mathematical language.',
        status: 'next' as const,
        category: 'Math',
      },
      {
        id: 'math-2',
        title: 'Linear algebra for data',
        detail: 'Vectors, matrices, dot products, norms, projections, rank and eigenvectors.',
        status: 'later' as const,
        category: 'Math',
      },
      {
        id: 'math-3',
        title: 'Calculus and gradients',
        detail: 'Derivatives, partial derivatives, chain rule, Jacobians and optimization.',
        status: 'later' as const,
        category: 'Math',
      },
      {
        id: 'math-4',
        title: 'Probability and statistics',
        detail: 'Random variables, distributions, Bayes, expectation, variance and estimation.',
        status: 'later' as const,
        category: 'Math',
      },
    ],
  },
  {
    id: 'classical-machine-learning',
    name: 'Classical Machine Learning',
    tag: 'MODEL BUILDING',
    description: 'Learn the modelling workflow using real datasets and sound evaluation.',
    lessons: [
      {
        id: 'ml-1',
        title: 'Data investigation and feature engineering',
        detail: 'Data quality, leakage, missing values, encoding, scaling and feature reasoning.',
        status: 'later' as const,
        category: 'ML',
      },
      {
        id: 'ml-2',
        title: 'Supervised learning',
        detail: 'Linear and logistic regression, trees, ensembles and model evaluation.',
        status: 'later' as const,
        category: 'ML',
      },
      {
        id: 'ml-3',
        title: 'Unsupervised learning and dimensionality reduction',
        detail: 'Clustering, PCA and representation of high-dimensional data.',
        status: 'later' as const,
        category: 'ML',
      },
    ],
  },
  {
    id: 'deep-learning-pytorch',
    name: 'Deep Learning & PyTorch',
    tag: 'NEURAL NETWORKS',
    description: 'Understand neural networks before moving into transformer internals.',
    lessons: [
      {
        id: 'dl-1',
        title: 'Tensors and PyTorch workflow',
        detail:
          'Tensor creation, shapes, broadcasting, matrix multiplication, autograd and datasets.',
        status: 'later' as const,
        category: 'PyTorch',
      },
      {
        id: 'dl-2',
        title: 'Neural networks from scratch',
        detail: 'Neurons, layers, loss functions, backpropagation, optimizers and training loops.',
        status: 'later' as const,
        category: 'Deep Learning',
      },
      {
        id: 'dl-3',
        title: 'CNNs and practical deep learning',
        detail: 'Convolutions, transfer learning, regularization and experiment tracking.',
        status: 'later' as const,
        category: 'Deep Learning',
      },
      {
        id: 'dl-4',
        title: 'Attention and transformers',
        detail: 'Attention, self-attention, positional information and a small GPT implementation.',
        status: 'later' as const,
        category: 'LLMs',
      },
    ],
  },
  {
    id: 'software-engineering-mlops',
    name: 'Software Engineering & MLOps',
    tag: 'SHIP RELIABLY',
    description: 'Turn experiments into testable, deployable software.',
    lessons: [
      {
        id: 'ops-1',
        title: 'Python software engineering',
        detail: 'OOP when useful, project structure, typing, tests, logging and packaging.',
        status: 'later' as const,
        category: 'Engineering',
      },
      {
        id: 'ops-2',
        title: 'APIs, FastAPI and Docker',
        detail: 'Build inference APIs, validate inputs, containerize and test services.',
        status: 'later' as const,
        category: 'MLOps',
      },
      {
        id: 'ops-3',
        title: 'MLflow, CI/CD and monitoring',
        detail: 'Track experiments, version data, automate checks and monitor model services.',
        status: 'later' as const,
        category: 'MLOps',
      },
      {
        id: 'ops-4',
        title: 'Cloud deployment foundations',
        detail: 'Deploy a small service, understand object storage, compute, networking and costs.',
        status: 'later' as const,
        category: 'Cloud',
      },
    ],
  },
  {
    id: 'systems-distributed-computing',
    name: 'Systems & Distributed Computing',
    tag: 'SYSTEMS DEPTH',
    description: 'Learn the infrastructure ideas behind scalable services and ML platforms.',
    lessons: [
      {
        id: 'sys-1',
        title: 'Operating systems and networking',
        detail: 'Processes, memory, concurrency, HTTP, TCP, latency and resource limits.',
        status: 'later' as const,
        category: 'Systems',
      },
      {
        id: 'sys-2',
        title: 'Databases, caching and queues',
        detail: 'Indexes, transactions, cache policies, task queues, streams and backpressure.',
        status: 'later' as const,
        category: 'Systems',
      },
      {
        id: 'sys-3',
        title: 'Distributed systems foundations',
        detail: 'Replication, consistency, partitioning, consensus, failure and observability.',
        status: 'later' as const,
        category: 'Distributed Systems',
      },
      {
        id: 'sys-4',
        title: 'System design for ML services',
        detail: 'Design an ML-backed service with SLOs, capacity estimates and failure handling.',
        status: 'later' as const,
        category: 'System Design',
      },
    ],
  },
  {
    id: 'inference-engineering-ai-infrastructure',
    name: 'Inference Engineering & AI Infrastructure',
    tag: 'SPECIALIZATION',
    description: 'Your primary specialization: measure, optimize and operate model inference.',
    lessons: [
      {
        id: 'inf-1',
        title: 'Run and inspect your first open LLM',
        detail: 'Load a small model, tokenize prompts, generate output and observe GPU memory.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-2',
        title: 'Prefill, decode and KV cache',
        detail: 'Understand token generation, KV memory, context length and concurrency limits.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-3',
        title: 'Benchmark inference correctly',
        detail: 'Measure TTFT, TPOT, throughput, tail latency, goodput and reproducibility.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-4',
        title: 'Serving engines and continuous batching',
        detail: 'Compare a basic PyTorch server with vLLM; study scheduling and batching.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-5',
        title: 'Quantization, profiling and optimization',
        detail: 'Study precision, memory bandwidth, profiling and quality/performance tradeoffs.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-6',
        title: 'Production inference capstone',
        detail: 'Build, benchmark, monitor and document a cost-aware inference service.',
        status: 'later' as const,
        category: 'Capstone',
      },
    ],
  },
];
export const starterGoals = [
  { id: 'g1', title: 'Build a consistent Python practice habit', due: '2026-11-30', done: false },
  {
    id: 'g2',
    title: 'Finish the current real-dataset investigation',
    due: '2026-12-15',
    done: false,
  },
  {
    id: 'g3',
    title: 'Publish one honest technical learning update each week',
    due: '2026-12-31',
    done: false,
  },
];
