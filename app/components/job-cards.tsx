import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex, Space, Tag, Typography } from "antd";
import { formatDistance } from "date-fns";
import { random, stripText } from "~/lib/utils";
import type { Job } from "~/types";

export type JobCardProps = {
  job: Job;
  onClick?: (job: Job) => void;
};

export function JobCard({ job, onClick }: JobCardProps) {
  const footerItems = [
    { icon: EnvironmentOutlined, label: job.location },
    { icon: SolutionOutlined, label: job.jobType.toLowerCase() },
    {
      icon: ClockCircleOutlined,
      label: job.deadline
        ? formatDistance(job.deadline, new Date(), {
            addSuffix: true,
          }) + " left"
        : "N/A",
    },
  ];

  return (
    <Card
      hoverable
      onClick={() => onClick?.(job)}
      className="bg-white! rounded-xl! cursor-pointer hover:border! hover:border-blue-300!"
    >
      <Space orientation="vertical">
        <div className="flex items-center gap-4">
          <Avatar size={40} src={job.company.logo} />
          <div>
            <Typography.Title level={4}>{job.title}</Typography.Title>
            <div className="flex items-center gap-2">
              <Typography.Text type="secondary">
                {job.company.name} {" - "}
              </Typography.Text>
              {job.skills.map((skill, index) => (
                <Tag
                  key={index.toString()}
                  color={random([
                    "blue",
                    "purple",
                    "cyan",
                    "green",
                    "magenta",
                    "pink",
                    "red",
                    "orange",
                    "yellow",
                    "volcano",
                    "geekblue",
                    "lime",
                    "gold",
                  ])}
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Typography.Paragraph
            ellipsis={{ expandable: "collapsible", expanded: false, rows: 5 }}
            className="text-gray-400!"
          >
            {stripText(job.description).replaceAll("\n\n", "<br />")}
          </Typography.Paragraph>
        </div>
        <div className="flex justify-between items-center gap-5">
          {footerItems.map(({ icon: Icon, label }, index) => (
            <Space
              key={index.toString()}
              size={5}
              className="text-gray-400! capitalize!"
            >
              <Icon />
              {label}
            </Space>
          ))}
        </div>
      </Space>
    </Card>
  );
}
