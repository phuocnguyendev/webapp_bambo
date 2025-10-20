import { path } from "@/constants/path";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clearTokens, getUserIdFromToken } from "../utils/utils";
import { useGetDetailAccount } from "@/features/Account/hooks/useAccount";

export interface AuthContextType {
  isAuthenticated: boolean;
  saveToken: (responseData: RefreshTokenResponse) => void;
  isLoading?: boolean;
  isAuthChecked: boolean;
  logout: () => void;
  user: Account | null | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/** Safe localStorage helpers (tránh lỗi khi SSR) */
const ls = {
  get: (key: string) =>
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null,
  set: (key: string, value: string) =>
    typeof window !== "undefined"
      ? window.localStorage.setItem(key, value)
      : undefined,
  remove: (key: string) =>
    typeof window !== "undefined"
      ? window.localStorage.removeItem(key)
      : undefined,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initToken = ls.get("accessToken");
  const initUserId = initToken ? getUserIdFromToken(initToken) : null;

  const [userId, setUserId] = useState<string | null>(initUserId!);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initUserId);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  const { data: user, isLoading } = useGetDetailAccount(userId ?? "");

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        const token = ls.get("accessToken");
        const uid = token ? getUserIdFromToken(token) : null;
        setUserId(uid ?? null);
        setIsAuthenticated(!!uid);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const saveToken = useCallback((responseData: RefreshTokenResponse) => {
    const { accessToken, refreshToken } = responseData;

    ls.set("accessToken", accessToken);
    ls.set("refreshToken", refreshToken);

    const uid = getUserIdFromToken(accessToken);
    setUserId(uid ?? null);
    setIsAuthenticated(!!uid);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUserId(null);
    setIsAuthenticated(false);
    window.location.replace(path.Login);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      saveToken,
      isAuthChecked,
      logout,
      user: user ?? null,
      isLoading,
    }),
    [isAuthenticated, saveToken, isAuthChecked, logout, user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
