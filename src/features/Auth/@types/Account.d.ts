type AccountLoginFormValues = {
  username?: string;
  password?: string;
};

type AccountRefreshToken = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
