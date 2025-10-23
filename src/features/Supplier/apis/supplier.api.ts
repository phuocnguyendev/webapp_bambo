import HttpService from "@/configs/apiMethodsConfig";
import { serialize } from "@/utils/utils";
import { isNull, omitBy } from "lodash";

const endPoint = `api/v1/Supplier`;
const supplierApis = {
  GetAll: (param: SearchSupplierQueryParams) => {
    return HttpService.GET<ResponseApi<PageModelResponse<SupplierResponse>>>(
      `${endPoint}/GetAll?${serialize(omitBy({ ...param }, isNull))}`
    );
  },
  Create: (data: Supplier) => {
    return HttpService.POST<ResponseApi<SupplierResponse>>(
      `${endPoint}/Create`,
      data
    );
  },

  Update: (data: SupplierResponse) => {
    return HttpService.PUT<ResponseApi<SupplierResponse>>(
      `${endPoint}/Update`,
      data
    );
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<SupplierResponse>>(
      `${endPoint}/GetById/${id}`
    );
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<SupplierResponse>>(
      `${endPoint}/Delete/${id}`
    );
  },
};

export default supplierApis;
