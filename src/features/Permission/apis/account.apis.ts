import HttpService from "@/configs/apiMethodsConfig";
import { serialize } from "@/utils/utils";
import { isNull, omitBy } from "lodash";

const endPoint = `api/v1/User`;
const endPointRole = `api/v1/Role`;

const accountApis = {
  GetAll: (param: SearchAccountParams) => {
    return HttpService.GET<ResponseApi<PageModelResponse<AccountListResponse>>>(
      `/${endPoint}/GetAll?${serialize(
        omitBy(
          {
            ...param,
          },
          isNull
        )
      )}`
    );
  },
  Create: (data: Account) => {
    return HttpService.POST<ResponseApi<Account>>(`/${endPoint}/Create`, data);
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<Account>>(`/${endPoint}/GetById/${id}`);
  },
  Update: (data: Account) => {
    return HttpService.PUT<ResponseApi<Account>>(`/${endPoint}/Update`, data);
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<Account>>(
      `/${endPoint}/Delete/${id}`
    );
  },
  GetOptionRole: () => {
    return HttpService.GET<ResponseApi<Option[]>>(
      `/${endPointRole}/GetOptions`
    );
  },
};

export default accountApis;
