import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Tabs, Typography, type MenuProps } from "antd";
import type { BaseTabsProps } from "antd/es/tabs";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { AccountSettings } from "~/components/settings/account-settings";
import SettingsAlert from "~/components/settings/settings-alert";
import { useState } from "react";
import type { Route } from "./+types/settings";
import { authContext } from "~/contexts/auth";

export async function loader({ context }: Route.LoaderArgs) {
  return context.get(authContext);
}

function getItem(
  name: string,
  children?: ReactNode,
  icon?: ReactNode,
): Required<BaseTabsProps>["items"][number] {
  const key = name.toLowerCase().replaceAll(" ", "-");

  return {
    key,
    label: name,
    icon,
    children,
  };
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { user } = loaderData;
  const [pageAlert, setPageAlert] = useState<null | {
    type: "success" | "warning";
    message: string;
  }>((location.state as any)?.alert ?? null);

  return (
    <Layout.Content>
      <Card
        title={
          <Typography.Title level={2} className="mt-3!">
            Settings
          </Typography.Title>
        }
      >
        {pageAlert ? (
          <SettingsAlert
            type={pageAlert.type}
            message={pageAlert.message}
            onClose={() => setPageAlert(null)}
          />
        ) : null}
        <Tabs
          tabPlacement="start"
          items={[
            getItem(
              "Account",
              <AccountSettings setPageAlert={setPageAlert} user={user!} />,
            ),
          ]}
          defaultActiveKey="account"
          activeKey={location.hash.toLowerCase().split("#").at(1) ?? "account"}
          onChange={(key) => (window.location.href = `#${key}`)}
        />
      </Card>
    </Layout.Content>
  );
}
