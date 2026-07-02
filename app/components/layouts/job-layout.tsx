import { Outlet, NavLink, useLocation } from "react-router";
import { Layout, Menu, Typography, type MenuProps } from "antd";
import Logo from "../logo";

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
