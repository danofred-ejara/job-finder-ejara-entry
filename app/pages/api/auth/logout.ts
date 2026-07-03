import { requireUser } from "~/server/auth";
import type { Route } from "./+types/logout";
import { deleteUserSession } from "~/server/session";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);

  const { headers } = await deleteUserSession(request);

  throw redirect("/auth/login", { headers });
}
