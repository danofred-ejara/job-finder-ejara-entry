export interface Profile {
  fullName: string;
  role: string;
  experiencedSince: Date;
  skills?: string[];
}

export interface SavedJob {
  userId: string;
  jobId: string;
  createdAt: Date;
}
