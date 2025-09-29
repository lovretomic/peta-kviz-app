import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import {
  onAuthStateChanged,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  getRedirectResult,
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
    await setPersistence(auth, browserLocalPersistence);

    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/operation-not-supported-in-this-environment"
      ) {
        signInWithRedirect(auth, provider);
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          fullName: currentUser.displayName || "",
          email: currentUser.email || "",
        });

        const tokenResult = await getIdTokenResult(currentUser, true);
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect success:", result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect error:", error);
      });
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
