import { useMutation, useQuery } from "@tanstack/react-query";
import accountApis from "../apis/account.apis";
import useQueryConfig from "./useQueryConfig";

export const useCreateAccount = () => {
  const mutation = useMutation({
    mutationFn: async (data: Account) => {
      const resp = await accountApis.Create(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useAccountList = () => {
  const { queryParams } = useQueryConfig();

  const queryData = useQuery({
    queryKey: ["accountList", queryParams],
    queryFn: async () => {
      const resp = await accountApis.GetAll({ ...queryParams });
      return resp.data.Item;
    },
  });

  return {
    ...queryData,
  };
};

export const useUpdateAccount = () => {
  const mutation = useMutation({
    mutationFn: async (data: AccountUpdate) => {
      const resp = await accountApis.Update(data);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};

export const useGetDetailAccount = (id: string) => {
  const queryData = useQuery({
    queryKey: ["accountDetail", id],
    queryFn: async () => {
      const resp = await accountApis.GetById(id);
      return resp.data.Item;
    },
    enabled: !!id,
  });

  return {
    ...queryData,
  };
};

export const useDeleteAccount = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const resp = await accountApis.Delete(id);
      return resp.data.Item;
    },
  });

  return {
    ...mutation,
  };
};
