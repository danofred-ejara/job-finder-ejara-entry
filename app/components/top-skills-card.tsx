import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Tag, Typography } from "antd";

export default function TopSkillsCard({ skills }: { skills: string[] }) {
  return (
    <Card
      className="bg-white!"
      title="Top Skills"
      extra={
        <Button variant="text" type="text">
          <EditOutlined />
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          return (
            <Tag key={index.toString()} color="blue">
              {skill}
            </Tag>
          );
        })}

        {skills.length === 0 && (
          <Typography.Paragraph className="text-center!">
            No Skills
          </Typography.Paragraph>
        )}
      </div>
    </Card>
  );
}
