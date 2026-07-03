import { redirect } from "react-router";
import type { Route } from "./+types/home";
import { requireUser } from "~/server/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);

  return redirect("/jobs");
}

export default function Home() {
  return <></>;
}
