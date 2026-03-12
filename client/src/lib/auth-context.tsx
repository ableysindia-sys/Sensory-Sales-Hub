import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  ConfirmationResult,
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
  pendingConfirmation: ConfirmationResult | null;
  setPendingConfirmation: (r: ConfirmationResult | null) => void;
  pendingPhone: string;
  setPendingPhone: (p: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  openAuthDrawer: () => {},
  isAuthDrawerOpen: false,
  setIsAuthDrawerOpen: () => {},
  authSuccessCallback: null,
  pendingConfirmation: null,
  setPendingConfirmation: () => {},
  pendingPhone: "",
  setPendingPhone: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authSuccessCallback, setAuthSuccessCallback] = useState<(() => void) | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<ConfirmationResult | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string>("");

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
        pendingConfirmation,
        setPendingConfirmation,
        pendingPhone,
        setPendingPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
