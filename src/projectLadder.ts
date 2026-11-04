export const PROJECT_LADDER = [
  { id: 'P0', title: 'Python Student Study Toolkit', status: 'Current foundation project' },
  { id: 'P1', title: 'Nigerian real-dataset investigation', status: 'In progress' },
  { id: 'P2', title: 'Credit risk / fraud modelling', status: 'Planned project' },
  { id: 'P3', title: 'PyTorch cassava disease classifier', status: 'Planned project' },
  { id: 'P4', title: 'FastAPI model service with tests and Docker', status: 'Planned project' },
  { id: 'P5', title: 'Monitored, cached and load-tested ML service', status: 'Planned project' },
  { id: 'P6', title: 'Inference optimization capstone', status: 'Planned project' },
] as const;

export type ProjectId = (typeof PROJECT_LADDER)[number]['id'];
