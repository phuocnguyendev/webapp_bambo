import { useMutation, useQuery } from "@tanstack/react-query";
import useQueryConfig from "./useQueryConfig";
import supplierApis from "../apis/supplier.api";

export const useCreateSupplier = () => {
  const mutation = useMutation({
    mutationFn: async (data: Supplier) => {
      const resp = await supplierApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useSupplierList = () => {
  const { queryParams } = useQueryConfig();

  const queryData = useQuery({
    queryKey: ["supplier-list", queryParams],
    queryFn: async () => {
      const resp = await supplierApis.GetAll({ ...queryParams });
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const useSupplierUpdate = () => {
  const mutation = useMutation({
    mutationFn: async (data: SupplierResponse) => {
      const resp = await supplierApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailSupplier = (id: string) => {
  const queryData = useQuery({
    queryKey: ["supplierDetail", id],
    queryFn: async () => {
      const resp = await supplierApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeleteSupplier = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await supplierApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};
