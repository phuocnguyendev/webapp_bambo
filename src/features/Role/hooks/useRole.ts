import { useMutation, useQuery } from "@tanstack/react-query";
import roleApis from "../apis/role.apis";

export const useCreateRole = () => {
  const mutation = useMutation({
    mutationFn: async (data: Role) => {
      const resp = await roleApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useRoleList = () => {
  const queryData = useQuery({
    queryKey: ["role-list"],
    queryFn: async () => {
      const resp = await roleApis.GetAll();
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const useRoleUpdate = () => {
  const mutation = useMutation({
    mutationFn: async (data: RoleUpdate) => {
      const resp = await roleApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailRole = (id: string) => {
  const queryData = useQuery({
    queryKey: ["roleDetail", id],
    queryFn: async () => {
      const resp = await roleApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeleteRole = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await roleApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetOptionRole = (enabled: boolean) => {
  const queryData = useQuery({
    queryKey: ["roleOptions"],
    queryFn: async () => {
      const resp = await roleApis.GetOptionRole();
      return resp.data.Item;
    },
    enabled,
  });

  return {
    ...queryData,
  };
};
