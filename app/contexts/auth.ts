import { createContext } from "react-router";
import type { User } from "~/types";

export type AuthContextType = {
  user: User | null;
};

export const authContext = createContext<AuthContextType>({ user: null });
