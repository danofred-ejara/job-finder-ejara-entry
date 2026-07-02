import { Link } from "react-router";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const values = [
  {
    title: "Simplicity",
    description:
      "A clean and intuitive experience that helps you discover the right opportunities faster.",
  },
  {
    title: "Accessibility",
    description:
      "Smart filters and seamless navigation designed for professionals from every background.",
  },
  {
    title: "Opportunity",
    description:
      "Connecting talented people with meaningful careers that match their skills and ambitions.",
  },
];

const steps = [
  {
    title: "1. Explore",
    description:
      "Browse up-to-date job listings and quickly discover positions that fit your profile.",
  },
  {
    title: "2. Refine",
    description:
      "Filter jobs by location, employment type, skills, or preferred work arrangement.",
  },
  {
    title: "3. Apply",
    description:
      "Move forward with confidence using a streamlined application experience built for efficiency.",
  },
];

export default function AboutUs() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-sm">
        <Space orientation="vertical" size="middle" className="max-w-3xl">
          <Tag color="blue">About Ejara Jobs</Tag>

          <Title level={1} className="!mb-0 !text-white">
            Connecting talented people with opportunities that truly matter.
          </Title>

          <Paragraph className="!mb-0 text-lg text-gray-300! ">
            Ejara Jobs is designed to make job searching faster, easier, and
            more intuitive. Discover relevant opportunities through a modern
            interface, powerful filters, and a smooth browsing experience.
          </Paragraph>

          <div className="flex flex-wrap gap-3">
            <Button type="primary" size="large">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>

            <Button size="large">
              <Link to="/jobs">Explore the Platform</Link>
            </Button>
          </div>
        </Space>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <Space orientation="vertical" size="small" className="w-full">
            <Text strong className="text-blue-600">
              Our Mission
            </Text>

            <Title level={2} className="!mb-2">
              Making job searching simple, efficient, and inspiring.
            </Title>

            <Paragraph className="!mb-0 text-slate-600">
              We believe finding your next career opportunity should be an
              enjoyable experience. Our platform combines modern technologies
              with a clean design to help candidates focus on what matters most:
              discovering the right job.
            </Paragraph>
          </Space>
        </Card>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <Space orientation="vertical" size="small" className="w-full">
            <Text strong className="text-blue-600">
              Why Choose Us
            </Text>

            <ul className="ml-5 list-disc space-y-2 text-slate-600">
              <li>Fast and intuitive job search.</li>
              <li>Powerful filters tailored to your preferences.</li>
              <li>Modern, user-friendly interface with minimal friction.</li>
            </ul>
          </Space>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <Card
            key={value.title}
            className="rounded-2xl border border-slate-200 shadow-sm"
          >
            <Space orientation="vertical" size="small">
              <Title level={4} className="!mb-0">
                {value.title}
              </Title>

              <Paragraph className="!mb-0 text-slate-600">
                {value.description}
              </Paragraph>
            </Space>
          </Card>
        ))}
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <Title level={2} className="!mb-4">
          How the Platform Helps You
        </Title>

        <Row gutter={[16, 16]}>
          {steps.map((step) => (
            <Col xs={24} md={8} key={step.title}>
              <Card className="h-full rounded-2xl border border-slate-200 bg-slate-50">
                <Space orientation="vertical" size="small">
                  <Text strong className="text-blue-600">
                    {step.title}
                  </Text>

                  <Paragraph className="!mb-0 text-slate-600">
                    {step.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="rounded-[24px] border border-blue-100 bg-blue-50 p-6 text-center shadow-sm">
        <Title level={3} className="!mb-2">
          Ready to find your next opportunity?
        </Title>

        <Paragraph className="mx-auto max-w-2xl text-slate-600">
          Explore relevant job openings and take the next step toward the career
          you deserve.
        </Paragraph>

        <Button type="primary" size="large">
          <Link to="/jobs">Start Your Job Search</Link>
        </Button>
      </section>
    </div>
  );
}
