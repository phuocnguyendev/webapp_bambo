type Warehouse = {
  Code: string;
  Name: string;
  Address: string;
  Branch: string;
  Status: number;
};

type WarehouseResponse = Warehouse & {
  Id: string;
};
