type Product = {
  Code: string;
  Name: string;
  Material: string;
  SpecText: string;
  Uom: string;
  BaseCost: number;
  Status: boolean;
  Note: string;
  Barcode: string;
  HsCode: string;
  CountryOfOrigin: string;
  WeightKg: number;
  LengthCm: number;
  WidthCm: number;
  HeightCm: number;
  Version: number;
  ImageUrls: string;
  Sku: string;
  CreatedAt: string;
  UpdatedAt: string;
};

type ProductUpdate = Product & {
  Id: string;
};

type ProductListResponse = ProductUpdate;
