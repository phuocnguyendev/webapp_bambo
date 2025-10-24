import HttpService from "@/configs/apiMethodsConfig";
import { serialize } from "@/utils/utils";
import { isNull, omitBy } from "lodash";

const endPoint = `api/v1/Warehouse`;
const warehouseApis = {
  GetAll: (param: SearchWarehouseQueryParams) => {
    return HttpService.GET<ResponseApi<PageModelResponse<WarehouseResponse>>>(
      `${endPoint}/GetAll?${serialize(omitBy({ ...param }, isNull))}`
    );
  },
  Create: (data: Warehouse) => {
    return HttpService.POST<ResponseApi<WarehouseResponse>>(
      `${endPoint}/Create`,
      data
    );
  },

  Update: (data: WarehouseResponse) => {
    return HttpService.PUT<ResponseApi<WarehouseResponse>>(
      `${endPoint}/Update`,
      data
    );
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<WarehouseResponse>>(
      `${endPoint}/GetById/${id}`
    );
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<WarehouseResponse>>(
      `${endPoint}/Delete/${id}`
    );
  },
  ChangeStatus: (id: string[], status: boolean) => {
    return HttpService.PUT<ResponseApi<boolean>>(`${endPoint}/ChangeStatus`, {
      Ids: id,
      status: status,
    });
  },
};

export default warehouseApis;
