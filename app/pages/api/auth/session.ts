import { data } from "react-router";
import type { Route } from "./+types/session";
import { createUserSession } from "~/server/session";

export async function loader({ request }: Route.LoaderArgs) {
  if (request.method !== "POST") {
    throw data({ message: "Method not allowed" }, { status: 412 });
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const token = formData.get("token");

  if (!token) {
    throw data({ message: "missing required token value" }, { status: 422 });
  }

  const session = await createUserSession(String(token));

  return Response.json({ success: true }, { headers: session.headers });
}
