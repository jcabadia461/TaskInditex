interface Itask {
  id: string;
  idImage: string;
  status: string;
  createdAt: Date;
  startProcessingAt: Date | null;
  endProcessingAt: Date | null;
  error: string;
}

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

interface ItaskDetails {
  task: object;
  originalImage: object;
  resizedImages: object;
}

export { Itask, TaskStatus, ItaskDetails };
