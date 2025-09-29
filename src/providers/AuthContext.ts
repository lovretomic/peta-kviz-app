import { createContext } from "react";
import type { AuthContextType } from "./AuthProvider";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  loginWithGoogle: () => {},
  logout: () => {},
});
