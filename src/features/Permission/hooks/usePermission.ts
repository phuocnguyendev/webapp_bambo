import { useMutation, useQuery } from "@tanstack/react-query";
import permissionApis from "../apis/permission.apis";
import useQueryConfig from "./useQueryConfig";

export const useCreatePermission = () => {
  const mutation = useMutation({
    mutationFn: async (data: Permission) => {
      const resp = await permissionApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const usePermissionList = () => {
  const { queryParams } = useQueryConfig();

  const queryData = useQuery({
    queryKey: ["permission-list", queryParams],
    queryFn: async () => {
      const resp = await permissionApis.GetAll({ ...queryParams });
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const usePermissionUpdate = () => {
  const mutation = useMutation({
    mutationFn: async (data: PermissionUpdate) => {
      const resp = await permissionApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailPermission = (id: string) => {
  const queryData = useQuery({
    queryKey: ["permissionDetail", id],
    queryFn: async () => {
      const resp = await permissionApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeletePermission = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await permissionApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};
