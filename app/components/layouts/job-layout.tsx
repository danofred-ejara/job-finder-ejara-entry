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
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

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

const dropdownItems: MenuItem[] = [
  {
    key: "name",
    label: "John Doe",
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

export default function JobLayout() {
  const location = useLocation();

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
              src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
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
