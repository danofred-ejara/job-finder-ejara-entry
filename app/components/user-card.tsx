import { InboxOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space, Typography } from "antd";

const user = {
  id: "1",
  name: "John Doe",
  role: "Software Engineer",
  experience: "5 years",
  image: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
};

const { Title, Text, Link } = Typography;

export function UserCard() {
  return (
    <Card className="bg-white!">
      <Space orientation="vertical" className="w-full items-center">
        <Avatar size={64} src={user.image} />
        <Title level={4}>{user.name}</Title>
        <Text type="secondary">{user.role}</Text>
        <Text>{user.experience}</Text>
        <Button type="primary" className="gap-3">
          <InboxOutlined /> <span>Applied Job</span>
        </Button>
      </Space>
    </Card>
  );
}
