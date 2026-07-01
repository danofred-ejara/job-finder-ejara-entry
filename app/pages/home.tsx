import type { Route } from "./+types/home";
import { Button } from "antd";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Button type="primary">Test Button</Button>
    </div>
  );
}
