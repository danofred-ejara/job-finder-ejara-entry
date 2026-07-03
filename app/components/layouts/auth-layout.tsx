import { Layout, Typography } from "antd";
import { Outlet } from "react-router";

const { Footer, Content } = Layout;

export default function AuthLayout() {
  return (
    <Layout className="min-h-screen!">
      <Content className="flex! justify-center items-center">
        <Outlet />
      </Content>

      <Footer className="bg-white! text-center">
        <Typography.Paragraph>
          Copyrigth &copy; {new Date().getFullYear()} Ejara.io. All Rigth
          reserved
        </Typography.Paragraph>
      </Footer>
    </Layout>
  );
}
