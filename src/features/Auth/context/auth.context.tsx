import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clearTokens, getUserIdFromToken } from "../utils/utils";
import { path } from "@/constants/path";

export interface AuthContextType {
  isAuthenticated: boolean;
  saveToken: (responseData: RefreshTokenResponse) => void;
  isLoading?: boolean;
  isAuthChecked: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const extractedUserId = token ? getUserIdFromToken(token) : null;
    setIsAuthenticated(!!extractedUserId);
    setIsAuthChecked(true);
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

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      saveToken: loginAccount,
      isAuthChecked,
      logout: () => {
        clearTokens();
        window.location.replace(path.login);
      },
    }),
    [isAuthenticated, loginAccount, isAuthChecked]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
