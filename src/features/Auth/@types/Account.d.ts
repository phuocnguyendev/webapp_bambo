type AccountLoginFormValues = {
  Email?: string;
  Password?: string;
};

type AccountRefreshToken = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
