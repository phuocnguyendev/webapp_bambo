type Supplier = {
  Name: string;
  TaxCode: string;
  Phone: string;
  Email: string;
  Address: string;
  Rating: number;
  // Time for delivery
  LeadTime: number;
};

type SupplierResponse = Supplier & {
  Id: string;
};
