import type { Timestamp } from "firebase/firestore";
import { createCookieSessionStorage } from "react-router";
import { auth, firestore } from "~/lib/firebase/admin";
import type { Profile, User } from "~/types";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5, // r day,
    sameSite: "strict",
    secrets: [process.env.SESSION_SECRET || "session-secret-production-change"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, destroySession, commitSession } = sessionStorage;

export async function createUserSession(token: string) {
  const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days

  const cookie = await auth.createSessionCookie(token, { expiresIn });

  const session = await getSession();
  session.set("session", cookie);

  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  };
}

export async function deleteUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  };
}

export async function getUser(request: Request): Promise<User | null> {
  const session = await getSession(request.headers.get("Cookie"));
  const cookie = session.get("session");

  if (!cookie) {
    return null;
  }

  try {
    const parsed = await auth.verifySessionCookie(cookie, true);
    const profile = await getUserProfile(parsed.uid);

    return {
      uid: parsed.uid,
      email: String(parsed.email),
      imageUrl: parsed.picture,
      profile: profile ?? undefined,
    };
  } catch {
    return null;
  }
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  const profile = await firestore.collection("Profiles").doc(userId).get();

  if (!profile.exists) return null;

  const data = profile.data() as any;

  return {
    ...data,
    experiencedSince: (data.experiencedSince as Timestamp).toDate(),
  } as Profile;
}
