import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import {
  onAuthStateChanged,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";

export type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser({
        fullName: currentUser?.displayName || "",
        email: currentUser?.email || "",
      });

      if (currentUser) {
        const tokenResult = await getIdTokenResult(currentUser, true);
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        loginWithGoogle,
        logout: () => auth.signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
