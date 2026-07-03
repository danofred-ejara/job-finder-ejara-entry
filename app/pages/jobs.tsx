import { Layout, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import FindJobCard from "~/components/find-job-card";
import { JobCard } from "~/components/job-cards";
import { JobSearchFiltersCard } from "~/components/job-search-filters-card";
import TopSkillsCard from "~/components/top-skills-card";
import { UserCard } from "~/components/user-card";
import type { Route } from "./+types/jobs";
import { jobService } from "~/services/job.service";
import type { Job } from "~/types";
import { authContext } from "~/contexts/auth";
import { redirect } from "react-router";

const { Content } = Layout;

export async function loader({ request, context }: Route.LoaderArgs) {
  const { user } = context.get(authContext);

  if (!user?.profile) {
    throw redirect("/settings#account");
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const accept = request.headers.get("Accept-Language") ?? "en-US,en";
  const [_, language] = accept.match(/^([a-z]+)-([A-Z]+)/) ?? ["", "en", "US"];

  const query = searchParams.get("query") ?? user.profile.role ?? "Developer";
  const country =
    searchParams.get("country") ?? user.profile.country?.code ?? "US";
  const location = searchParams.get("location") ?? undefined;
  const employmentType = searchParams.get("employmentType") ?? undefined;

  const response = await jobService.searchJob({
    query,
    country,
    // location,
    employmentType,
    language,
  });

  return {
    jobs: response.data,
    user,
    search: {
      query,
      country,
      location,
      employmentType,
    },
  };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const { jobs, user, search } = loaderData;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(search.query);

  useEffect(() => {
    setSearchValue(search.query ?? "");
  }, [search.query]);

  const filters = useMemo(
    () => ({
      location: search.location,
      employmentType: search.employmentType,
    }),
    [search.location, search.employmentType],
  );

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    navigate({ pathname: "/jobs", search: params.toString() });
  };

  const handleFiltersChange = (values: Record<string, any>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      if (
        value == null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    navigate({ pathname: "/jobs", search: params.toString() });
  };

  return (
    <Content className="flex gap-5">
      <div className="max-w-3/12 ">
        <Space orientation="vertical" className="w-full" size={20}>
          <UserCard user={user} />
          <TopSkillsCard skills={user.profile?.skills ?? []} />
        </Space>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <FindJobCard
          value={searchValue}
          onSearch={(value) => {
            setSearchValue(value);
            handleSearch(value);
          }}
          loading={false}
        />
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
              name: "employmentType",
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
          initialValues={filters}
          onChange={handleFiltersChange}
        />
      </div>
    </Content>
  );
}
