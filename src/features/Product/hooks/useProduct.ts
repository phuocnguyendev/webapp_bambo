import { useMutation, useQuery } from "@tanstack/react-query";
import useQueryConfig from "./useQueryConfig";
import productApis from "../apis/product.apis";
import { downloadFile, getFileNameFromContentDisposition } from "@/utils/utils";

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: async (data: Product) => {
      const resp = await productApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useProductList = () => {
  const { queryParams } = useQueryConfig();

  const queryData = useQuery({
    queryKey: ["product-list", queryParams],
    queryFn: async () => {
      const resp = await productApis.GetAll({ ...queryParams });
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const useProductUpdate = () => {
  const mutation = useMutation({
    mutationFn: async (data: ProductUpdate) => {
      const resp = await productApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailProduct = (id: string) => {
  const queryData = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      const resp = await productApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await productApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useDownloadTemplateExcel = () => {
  return useMutation({
    mutationKey: ["downloadTemplate"],
    mutationFn: () => productApis.DownloadTemplate(),
    onSuccess: (data) => {
      const contentType = data.headers["content-type"];
      const blob = new Blob([data.data as BlobPart], { type: contentType });
      const disposition = data.headers["content-disposition"];
      const fileName = getFileNameFromContentDisposition(disposition);
      downloadFile(blob, fileName);
    },
  });
};

export const useImportExcel = () => {
  const mutation = useMutation({
    mutationFn: async (data: File) => {
      const resp = await productApis.Import(data);
      return resp.data;
    },
  });

  return {
    ...mutation,
  };
};

export const useExportInvalidProduct = () => {
  return useMutation({
    mutationKey: ["export-Invalid-product"],
    mutationFn: async (data: InvalidProduct) => {
      const response = await productApis.ExportInvalidProduct(data);
      return response;
    },
    onSuccess: (data) => {
      const contentType = data.headers["content-type"];
      const blob = new Blob([data.data as BlobPart], { type: contentType });
      const disposition = data.headers["content-disposition"];
      const fileName = getFileNameFromContentDisposition(disposition);
      downloadFile(blob, fileName);
    },
  });
};

export const useInsertManyProduct = () => {
  const mutation = useMutation({
    mutationFn: async (data: InsertManyProductRequest) => {
      const resp = await productApis.InsertMany(data);
      return resp.data;
    },
  });

  return {
    ...mutation,
  };
};
