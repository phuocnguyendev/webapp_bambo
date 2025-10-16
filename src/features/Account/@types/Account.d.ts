type Account = {
  Name: string;
  Email: string;
  Avatar_url: string;
  Status: boolean;
  Phone: string;
  RoleId: string;
};

type AccountListResponse = Omit<Account, "RoleId"> & {
  Id: string;
};

type AccountUpdate = Account & {
  Id: string;
};
