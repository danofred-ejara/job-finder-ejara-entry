import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  type UserCredential,
  type AuthError,
} from "firebase/auth";
import { auth } from "~/lib/firebase";

export class AuthService {
  async loginWithEmailAndPassword(input: { email: string; password: string }) {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password,
      );

      return this.getSession(credentials);
    } catch (error: any) {
      throw new Error(error.code);
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      return this.getSession(credentials);
    } catch (error: any) {
      throw new Error(error.code);
    }
  }

  private async getSession(credentials: UserCredential) {
    const token = await credentials.user.getIdToken();

    try {
      await fetch("/api/auth/session", {
        method: "POST",
        body: new URLSearchParams({ token }),
      });

      window.location.href = "/";
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
