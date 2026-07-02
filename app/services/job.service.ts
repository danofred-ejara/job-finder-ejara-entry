import { Jsearch, type JobDetails, type SearchJobInput } from "~/lib/jsearch";
import type { Job } from "~/types";

export interface SearchJobFilters {
  location?: string;
  country?: string;
  employmentType?: string;
  query: string;
  limit?: string;
  cursor?: string;
  language?: string;
}

export class JobService {
  private jsearch: Jsearch;

  constructor() {
    this.jsearch = new Jsearch(String(import.meta.env.VITE_JSEARCH_API_KEY));
  }

  async searchJob(filters: SearchJobFilters) {
    const params: Partial<SearchJobInput> = {
      country: filters.country,
      work_from_home: filters.location === "remote",
      employment_types: filters.employmentType as any,
      query: filters.query,
      num_pages: filters.limit ? Number(filters.limit) : undefined,
      cursor: filters.cursor,
      language: filters.language,
    };

    const response = await this.jsearch.jobSearch(params);

    return {
      data: response.data.jobs.map(this.toJob),
      cursor: response.data.cursor,
    };
  }

  async getJob(id: string) {
    const response = await this.jsearch.jobDetails({ job_id: id });
    return { data: this.toJob(response.data[0]) };
  }

  private toJob(job: JobDetails): Job {
    return {
      id: job.job_id,
      company: {
        name: job.employer_name,
        logo: job.employer_logo,
        website: job.employer_website ?? undefined,
      },
      title: job.job_title,
      description: job.job_description,
      jobType: job.job_employment_type,
      tags: job.required_technologies ?? [],
      skills: job.job_highlights.Responsibilities ?? [],
      benefits: job.job_highlights.Benefits ?? job.job_benefits_strings ?? [],
      qualifications: job.job_highlights.Qualifications ?? [],
      salary: {
        min: job.job_min_salary,
        max: job.job_max_salary,
        value: job.job_salary,
      },
      apply: {
        isDirect: job.job_apply_is_direct,
        link: job.job_apply_link,
        publisher: job.job_publisher,
      },
      location: job.job_location,
      postedAt: new Date(job.job_posted_at_timestamp * 1000),
      deadline: null,
    };
  }
}

export const jobService = new JobService();
