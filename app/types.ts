export interface User {
  uid: string;
  email: string;
  profile?: Profile;
}

export interface Profile {
  fullName: string;
  email: string;
  role: string;
  experiencedSince: Date;
  skills?: string[];
  userId: string;
}

export interface SavedJob {
  userId: string;
  jobId: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: Company;
  location: string;
  jobType: string;
  postedAt: Date;
  deadline: Date | null;
  tags: string[];
  skills: string[];
  benefits: string[];
  qualifications: string[];
  salary: Record<"min" | "max" | "value", number | null>;
  apply: {
    publisher: string;
    link: string;
    isDirect: boolean;
  };
}

export interface Company {
  name: string;
  logo: string | null;
  website?: string;
}
