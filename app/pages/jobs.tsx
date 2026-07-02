import { Card, Layout, Space } from "antd";
import FindJobCard from "~/components/find-job-card";
import { JobCard } from "~/components/job-cards";
import { JobSearchFiltersCard } from "~/components/job-search-filters-card";
import TopSkillsCard from "~/components/top-skills-card";
import { UserCard } from "~/components/user-card";
import type { Route } from "./+types/jobs";
import { jobService } from "~/services/job.service";
import type { Job } from "~/types";

const { Sider, Content } = Layout;

const mockedJobs = new Array(3).fill({
  id: "test-123",
  title: "Frontend Developer",
  description:
    "We are looking for a skilled frontend developer to join our team.\n\nYou will be responsible for building and maintaining our web applications.",
  company: {
    name: "Google",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRE_1cXg00HGctRPrZJenJP9db8aEdrNl3v2Gw5L4lrA&s",
  },
  deadline: new Date("2026-12-31"),
  location: "San Francisco, CA",
  jobType: "FULLTIME",
  tags: ["JavaScript", "React", "TypeScript"],
  skills: ["Frontend Development", "UI/UX Design"],
  postedAt: new Date(),
}) as Job[];

export async function loader({ request }: Route.LoaderArgs) {
  const accept = request.headers.get("Accept-Language") ?? "en-US,en";
  const [_, language, country] = accept.match(/^([a-z]+)-([A-Z]+)/) ?? [
    "",
    "en",
    "US",
  ];

  // const response = await jobService.searchJob({
  //   query: "Web developer",
  //   country,
  //   language,
  // });

  // return response.data;

  return mockedJobs;
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const jobs = loaderData;

  return (
    <Content className="flex gap-5">
      <div className="max-w-3/12 ">
        <Space orientation="vertical" className="w-full" size={20}>
          <UserCard />
          <TopSkillsCard />
        </Space>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <FindJobCard />
        <Space orientation="vertical" size={20}>
          {jobs.map((job, index) => (
            <JobCard job={job} key={index.toString()} />
          ))}
        </Space>
      </div>
      <div className="max-w-4/12">
        <JobSearchFiltersCard
          filters={[
            {
              label: "Job Location",
              type: "checkbox",
              name: "location",
              options: [
                {
                  label: "Remote",
                  value: "remote",
                },
                {
                  label: "On Site",
                  value: "onsite",
                },
              ],
            },
            {
              label: "Job Type",
              name: "employment_types",
              type: "radio",
              options: [
                {
                  label: "Full-Time",
                  value: "FULLTIME",
                },
                {
                  label: "Part-Time",
                  value: "PARTTIME",
                },
                {
                  label: "Internship",
                  value: "INTERN",
                },
              ],
            },
          ]}
        />
      </div>
    </Content>
  );
}
