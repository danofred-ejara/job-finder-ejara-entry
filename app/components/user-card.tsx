import { InboxOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import type { User } from "~/types";

const { Title, Text, Link } = Typography;

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="bg-white!">
      <Space orientation="vertical" className="w-full items-center">
        <Avatar size={64} src={user.imageUrl} />
        <Title level={4}>{user.profile?.fullName}</Title>
        <Text type="secondary">{user.profile?.role}</Text>
        <Text>
          Experienced since{" "}
          {user.profile?.experiencedSince
            ? formatDistanceToNow(user.profile?.experiencedSince)
            : "N/A"}
        </Text>
        <Button type="primary" className="gap-3">
          <InboxOutlined /> <span>Applied Job</span>
        </Button>
      </Space>
    </Card>
  );
}
