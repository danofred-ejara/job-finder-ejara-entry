import { redirect } from "react-router";
import { getUser } from "./session";

export async function requireUser(request: Request) {
  const user = await getUser(request);

  if (!user) {
    throw redirect("/auth/login");
  }

  return user;
}

export async function requireGuess(request: Request) {
  const user = await getUser(request);

  if (user) {
    throw redirect("/");
  }
}
