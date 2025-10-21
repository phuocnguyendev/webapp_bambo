type Role = {
  Name: string;
  Code: string;
  LastUpdatedAt: string;
  LastUpdatedBy: string;
};

type RoleUpdate = Role & {
  Id: string;
};
