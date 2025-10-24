import { useMutation, useQuery } from "@tanstack/react-query";
import useQueryConfig from "./useQueryConfig";
import warehouseApis from "../apis/warehouse.apis";

export const useCreateWarehouse = () => {
  const mutation = useMutation({
    mutationFn: async (data: Warehouse) => {
      const resp = await warehouseApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useWarehouseList = () => {
  const { queryParams } = useQueryConfig();

  const queryData = useQuery({
    queryKey: ["warehouse-list", queryParams],
    queryFn: async () => {
      const resp = await warehouseApis.GetAll({ ...queryParams });
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const useWarehouseUpdate = () => {
  const mutation = useMutation({
    mutationFn: async (data: WarehouseResponse) => {
      const resp = await warehouseApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailWarehouse = (id: string) => {
  const queryData = useQuery({
    queryKey: ["warehouseDetail", id],
    queryFn: async () => {
      const resp = await warehouseApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeleteWarehouse = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await warehouseApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useWarehouseChangeStatus = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string[]; status: boolean }) => {
      const resp = await warehouseApis.ChangeStatus(id, status);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};
