import HttpService from "@/configs/apiMethodsConfig";
import { serialize } from "@/utils/utils";
import { isNull, omitBy } from "lodash";

const endPoint = `api/v1/Permission`;

const permissionApis = {
  GetAll: (param: SearchPermissionParams) => {
    return HttpService.GET<ResponseApi<PageModelResponse<PermissionUpdate>>>(
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
  Create: (data: Permission) => {
    return HttpService.POST<ResponseApi<Permission>>(
      `/${endPoint}/Create`,
      data
    );
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<Permission>>(
      `/${endPoint}/GetById/${id}`
    );
  },
  Update: (data: PermissionUpdate) => {
    return HttpService.PUT<ResponseApi<PermissionUpdate>>(
      `/${endPoint}/Update`,
      data
    );
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<PermissionUpdate>>(
      `/${endPoint}/Delete/${id}`
    );
  },
};

export default permissionApis;
