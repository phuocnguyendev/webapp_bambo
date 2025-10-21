import HttpService from "@/configs/apiMethodsConfig";
import { serialize } from "@/utils/utils";
import { isNull, omitBy } from "lodash";

const endPoint = `api/v1/Product`;

const productApis = {
  GetAll: (param: SearchQueryProductParams) => {
    return HttpService.GET<ResponseApi<PageModelResponse<ProductUpdate>>>(
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
  Create: (data: Product) => {
    return HttpService.POST<ResponseApi<Product>>(`/${endPoint}/Create`, data);
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<Product>>(`/${endPoint}/GetById/${id}`);
  },
  Update: (data: ProductUpdate) => {
    return HttpService.PUT<ResponseApi<ProductUpdate>>(
      `/${endPoint}/Update`,
      data
    );
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<ProductUpdate>>(
      `/${endPoint}/Delete/${id}`
    );
  },
};

export default productApis;
