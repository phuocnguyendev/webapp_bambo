import { useMutation, useQuery } from "@tanstack/react-query";
import useQueryConfig from "./useQueryConfig";
import productApis from "../apis/product.apis";

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
