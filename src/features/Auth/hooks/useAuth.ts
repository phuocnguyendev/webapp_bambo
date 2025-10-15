import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import authApis from "../apis/auth.apis";

export const useLoginAccount = (): UseMutationResult<
  ResponseApi<RefreshTokenResponse>,
  Error,
  AccountLoginFormValues
> => {
  const mutation = useMutation<
    ResponseApi<RefreshTokenResponse>,
    Error,
    AccountLoginFormValues
  >({
    mutationFn: async (data: AccountLoginFormValues) => {
      const resp = await authApis.PostLogin(data);
      const responseData: ResponseApi<RefreshTokenResponse> = resp.data;
      return responseData;
    },
  });
  return mutation;
};
export const useCreateAccount = () => {};
export const useGetById = () => {};
