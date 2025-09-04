import { clearTokens } from "@/lib/auth";

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
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

export const isDecimal = (num: number): boolean => {
  return typeof num === "number" && num % 1 !== 0;
};
