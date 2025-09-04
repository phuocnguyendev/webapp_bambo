export const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

export const saveAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const saveRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
