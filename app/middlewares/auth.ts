import { type RouterContextProvider } from "react-router";
import { authContext } from "~/contexts/auth";
import { requireUser } from "~/server/auth";

export async function authMiddleware({ request, context }: any) {
  const user = await requireUser(request);

  (context as RouterContextProvider).set(authContext, { user });
}
