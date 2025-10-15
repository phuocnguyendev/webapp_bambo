import HttpService from "@/configs/apiMethodsConfig";

const endPoint = `api/v1/Auth`;

const authApis = {
  PostLogin: (data: AccountLoginFormValues) =>
    HttpService.POST<ResponseApi<RefreshTokenResponse>>(
      `/${endPoint}/Login`,
      data
    ),
  PostRefreshToken: (data: AccountRefreshToken) =>
    HttpService.POST<ResponseApi<RefreshTokenResponse>>(
      `/${endPoint}/RefreshToken`,
      data
    ),
};

export default authApis;
