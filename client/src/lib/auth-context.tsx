import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  openAuthDrawer: (callbackOnSuccess?: () => void) => void;
  isAuthDrawerOpen: boolean;
  setIsAuthDrawerOpen: (open: boolean) => void;
  authSuccessCallback: (() => void) | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  openAuthDrawer: () => {},
  isAuthDrawerOpen: false,
  setIsAuthDrawerOpen: () => {},
  authSuccessCallback: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authSuccessCallback, setAuthSuccessCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const logout = useCallback(() => signOut(auth), []);

  const openAuthDrawer = useCallback((callbackOnSuccess?: () => void) => {
    setAuthSuccessCallback(callbackOnSuccess ? () => callbackOnSuccess : null);
    setIsAuthDrawerOpen(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        openAuthDrawer,
        isAuthDrawerOpen,
        setIsAuthDrawerOpen,
        authSuccessCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
