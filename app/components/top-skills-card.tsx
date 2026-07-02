import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Tag } from "antd";

const skills = ["JavaScript", "React", "User Interface", "Product Designer"];

export default function TopSkillsCard() {
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
      </div>
    </Card>
  );
}
