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
  CreatedAt?: string;
  UpdatedAt?: string;
};

type ProductUpdate = Product & {
  Id: string;
};

type ProductListResponse = ProductUpdate;

type InvalidProduct = {
  ErrorMessage: string;
  ErrorCells: number[];
  CellValues: string[];
};

type ProductRow = {
  id: string;
  STT: number;
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": number;
  "6": boolean;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": number;
  "12": number;
  "13": number;
  "14": number;
  "15": string;
  "16": string;
  "17": string;
  ErrorMessage?: string;
};

type InsertManyProductRequest = {
  cleanedData: Product[];
};
