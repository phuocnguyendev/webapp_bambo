import { path } from "@/constants/path";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clearTokens, getUserIdFromToken } from "../utils/utils";

export interface AuthContextType {
  isAuthenticated: boolean;
  saveToken: (responseData: RefreshTokenResponse) => void;
  isLoading?: boolean;
  isAuthChecked: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const extractedUserId = token ? getUserIdFromToken(token) : null;
    console.log("Auth init - token:", !!token, "userId:", !!extractedUserId);
    return !!extractedUserId;
  });
  const isAuthChecked = true;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const extractedUserId = token ? getUserIdFromToken(token) : null;
    console.log("Auth effect - token:", !!token, "userId:", !!extractedUserId);
    setIsAuthenticated(!!extractedUserId);
  }, []);

  const loginAccount = useCallback((responseData: RefreshTokenResponse) => {
    const { accessToken, refreshToken } = responseData;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userIdFromToken = getUserIdFromToken(accessToken);
    if (userIdFromToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setIsAuthenticated(false);
    window.location.replace(path.login);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      saveToken: loginAccount,
      isAuthChecked,
      logout,
    }),
    [isAuthenticated, loginAccount, isAuthChecked, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
