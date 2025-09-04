import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (responseData: RefreshTokenResponse) => void;
  isLoading: boolean;
  isAuthChecked: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
