import HttpService from "@/configs/apiMethodsConfig";

const endPoint = `api/v1/Role`;

const roleApis = {
  GetAll: () => {
    return HttpService.GET<ResponseApi<RoleUpdate>>(`/${endPoint}/GetAll`);
  },
  Create: (data: Role) => {
    return HttpService.POST<ResponseApi<Role>>(`/${endPoint}/Create`, data);
  },
  GetById: (id: string) => {
    return HttpService.GET<ResponseApi<Role>>(`/${endPoint}/GetById/${id}`);
  },
  Update: (data: RoleUpdate) => {
    return HttpService.PUT<ResponseApi<RoleUpdate>>(
      `/${endPoint}/Update`,
      data
    );
  },
  Delete: (id: string) => {
    return HttpService.DELETE<ResponseApi<RoleUpdate>>(
      `/${endPoint}/Delete/${id}`
    );
  },
  GetOptionRole: () => {
    return HttpService.GET<ResponseApi<Option[]>>(`/${endPoint}/GetOptions`);
  },
};

export default roleApis;
