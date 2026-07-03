import { Outlet, NavLink, useLocation, Link } from "react-router";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Typography,
  type MenuProps,
} from "antd";
import Logo from "../logo";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Route } from "./+types/job-layout";
import { authMiddleware } from "~/middlewares/auth";
import { authContext } from "~/contexts/auth";

const { Header, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    key: "/jobs",
    label: <NavLink to="/jobs">Find Jobs</NavLink>,
  },
  {
    key: "/salary",
    label: <NavLink to="/salary">Salary</NavLink>,
  },
  {
    key: "/about-us",
    label: <NavLink to="/about-us">About Us</NavLink>,
  },
];

export async function loader({ context }: Route.LoaderArgs) {
  return context.get(authContext);
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function JobLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { user } = loaderData;

  const dropdownItems: MenuItem[] = [
    {
      key: "name",
      label: user?.profile?.fullName,
      disabled: true,
    },
    { type: "divider" },
    {
      key: "settings",
      label: <Link to="/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: <Link to="/api/auth/logout">Logout</Link>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Layout className="min-h-screen!">
      <Header className="bg-white! border-b border-gray-200 flex items-center">
        <Logo />
        <div className="flex-1">
          <Menu
            mode="horizontal"
            items={menuItems}
            defaultSelectedKeys={[location.pathname.toLowerCase()]}
            className="w-full flex justify-center"
          />
        </div>
        <Dropdown
          menu={{ items: dropdownItems }}
          styles={{ itemContent: { width: "150px" } }}
        >
          <Button variant="text" type="text" className="rounded-full! p-0!">
            <Avatar
              size={50}
              src={user?.imageUrl}
              icon={user?.imageUrl ? undefined : <UserOutlined />}
            />
          </Button>
        </Dropdown>
      </Header>
      <Layout>
        <div className="bg-gray-200 px-4 py-6 flex-1">
          <Outlet />
        </div>
        <Footer>
          <Typography className="text-center">
            Copyright © {new Date().getFullYear()} Ejara.io. All rights
            reserved.
          </Typography>
        </Footer>
      </Layout>
    </Layout>
  );
}
