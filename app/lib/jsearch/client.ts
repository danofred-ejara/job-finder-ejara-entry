import axios, { type AxiosInstance } from "axios";
import type {
  JobDetailsInput,
  JobSalaryInput,
  SearchJobInput,
  SearchJobResponse,
} from "./types";

export class Jsearch {
  private http: AxiosInstance;

  constructor(apiKey: string) {
    this.http = axios.create({
      baseURL: "https://api.openwebninja.com/jsearch/search-v2",
      headers: {
        Accept: "application/json",
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      withXSRFToken: false,
      withCredentials: false,
    });
  }

  async jobSearch(params: SearchJobInput) {
    return this.get<SearchJobResponse>("/search-v2", params);
  }

  async jobDetails(params: JobDetailsInput) {
    return this.get("job-details", params);
  }

  async jobSalary(params: JobSalaryInput) {
    return this.get("estimated-salary", params);
  }

  async companyJobSalary(params: any) {
    return this.get("company-job-salary", params);
  }

  private async get<T = any>(endpoint: string, params: any): Promise<T> {
    const response = await this.http.get<T>(endpoint, { params });
    return response.data;
  }
}
