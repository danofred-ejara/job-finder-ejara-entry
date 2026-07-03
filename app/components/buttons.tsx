import { Avatar, Button, Typography, type ButtonProps } from "antd";

export function GoogleAuthButton({ ...props }: Omit<ButtonProps, "children">) {
  return (
    <Button size="large" className="w-full" {...props}>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRE_1cXg00HGctRPrZJenJP9db8aEdrNl3v2Gw5L4lrA&s" />
      <Typography.Text>Continue with Goole</Typography.Text>
    </Button>
  );
}
