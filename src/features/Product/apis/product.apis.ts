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

  DownloadTemplate: () =>
    HttpService.GET(`${endPoint}/DownloadTemplate`, {
      responseType: "blob",
    }),
  Import: (data: File) => {
    const formData = new FormData();
    // backend expects the uploaded file field to be 'file' (lowercase) and accepting filename
    formData.append("file", data, data.name);

    return HttpService.POSTFORM<ResponseApi<ResponseExcel<any>>>(
      `${endPoint}/Import`,
      formData,
      {
        headers: { Accept: "*/*" },
      }
    );
  },

  ExportInvalidProduct: (data: InvalidProduct) =>
    HttpService.POST(`${endPoint}/DownloadInvalidProduct`, data, {
      responseType: "blob",
    }),
  InsertMany: (data: InsertManyProductRequest) =>
    HttpService.POST<ResponseApi<any>>(`${endPoint}/InsertMany`, data),
};

export default productApis;
