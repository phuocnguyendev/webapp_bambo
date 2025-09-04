import HttpService from "@/configs/apiMethodsConfig";

const endPoint = `api/Account`;

const authApis = {
  PostRefreshToken: (data: AccountRefreshToken) =>
    HttpService.POST<ResponseApi<RefreshTokenResponse>>(
      `/${endPoint}/RefreshToken`,
      data
    ),
};

export default authApis;
