import { useMutation } from "@tanstack/react-query";
import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { useCallback } from "react";
import { GoogleAuthButton } from "~/components/buttons";
import { authService } from "~/services/auth.service";

export default function Login() {
  const [form] = Form.useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ email, password }: any) => {
      await authService.loginWithEmailAndPassword({ email, password });
    },
  });

  const loginWithEmailPassword = async (data: any) => {
    await mutateAsync(data, {
      onError: (err) => {
        form.setFields([{ name: "email", errors: [err.message] }]);
      },
    });
  };

  return (
    <div>
      <Card style={{ maxWidth: "50%", minWidth: "350px" }} className="shadow">
        <Space vertical style={{ width: "100%" }} size={40}>
          <div>
            <Typography.Title level={3}>Welcome Back,</Typography.Title>
            <Typography.Text>We are happy to see you again</Typography.Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            requiredMark
            onFinish={loginWithEmailPassword}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[{ required: true }]}
            >
              <Input name="email" type={"email"} />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[{ required: true }]}
            >
              <Input.Password name="password" />
            </Form.Item>

            <Form.Item>
              <Space vertical className="w-full mt-3" size={0}>
                <Button
                  type="primary"
                  size="large"
                  className="w-full font-bold"
                  htmlType="submit"
                  loading={isPending}
                >
                  Login
                </Button>
                <Divider>Or</Divider>
                <GoogleAuthButton
                  onClick={() => authService.loginWithGoogle()}
                />
              </Space>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Typography.Text>
                You don't have an account?{" "}
                <Typography.Link href="/auth/signup">Sign up</Typography.Link>
              </Typography.Text>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
