export interface SearchJobInput {
  query: string;
  cursor?: string;
  num_pages?: number;
  country?: string;
  language?: string;
  date_posted?: string;
  work_from_home?: boolean;
  employment_types?: JobEmploymentType;
  job_requirements?:
    | "no_experience"
    | "no_degree"
    | "more_than_3_years_experience"
    | "under_3_years_experience";
  radius?: number;

  /**
   * comma separated publishers.
   * @example Amazon,Meta
   */
  exclude_job_publishers?: string;

  /**
   * Fields to retrieve
   */
  fields?: string;
}

export type JobEmploymentType =
  "FULLTIME" | "CONTRACTOR" | "PARTTIME" | "INTERN";

export interface JobDetailsInput {
  job_id: string;
  country?: string;
  language?: string;
  fields?: string;
}

export interface JobSalaryInput {
  job_title: string;
  location: string;
  location_type?: "ANY" | "CITY" | "STATE" | "COUNTRY";

  /**
   * TODO: add more literal values
   */
  years_of_experience?: "ALL" | "LESS_THAN_ONE";

  fields?: string;
}

export interface JobDetails {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  employer_website: string | null;
  job_description: string;
  job_is_remote: boolean;
  job_publisher: string;
  job_employment_type: string;
  job_employment_types: JobEmploymentType[];
  job_posted_at: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[] | null;
  job_benefits_strings: string[] | null;
  job_salary: number | null;
  job_salary_string: string | null;
  job_max_salary: null | number;
  job_min_salary: null | number;
  job_salary_period: string | null;
  job_highlights: any;
  job_onet_soc: null | any;
  job_onet_job_zone: null | any;
  job_google_link: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  apply_options: ApplyOption[];
  employer_reviews: any | null;
}

export interface ApplyOption {
  apply_link: string;
  is_direct: boolean;
  publisher: string;
}

export interface SearchJobResponse extends BaseResponse {
  data: {
    jobs: JobDetails[];
    cursor: string;
  };
}

export interface BaseResponse {
  status: string;
  request_id: string;
  parameters?: Record<string, any>;
  error?: {
    message: string;
    code: number;
  };
}
