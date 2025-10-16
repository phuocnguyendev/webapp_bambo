import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  role: string;
  iss: string;
  iat: number;
  exp: number;
}

export const getUserIdFromToken = (token: string) => {
  try {
    const decodedToken: JwtPayload = jwtDecode(token);
    const userId = decodedToken["sub"];
    localStorage.setItem("userId", userId);
    return userId;
  } catch (error) {
    console.error(error);
  }
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const refreshTokenHelper = async (
  data: RefreshTokenResponse | undefined
): Promise<string | undefined> => {
  try {
    if (data) {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return accessToken;
    }
    clearTokens();
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
