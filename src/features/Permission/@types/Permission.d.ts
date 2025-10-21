type Permission = {
  Name: string;
  Code: string;
  LastUpdatedAt: string;
  LastUpdatedBy: string;
};

type PermissionUpdate = Permission & {
  Id: string;
};
