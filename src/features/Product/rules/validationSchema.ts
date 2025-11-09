import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { coerceBool, requiredNumber } from "@/utils/utils";

export const productSchema = z.object({
  Code: z.string().min(1, { message: "Mã sản phẩm là bắt buộc" }),
  Sku: z.string().optional().nullable(),
  Name: z.string().min(1, { message: "Tên sản phẩm là bắt buộc" }),
  Material: z.string().optional().nullable(),
  SpecText: z.string().optional().nullable(),
  Uom: z.string().optional().nullable(),

  BaseCost: requiredNumber("Giá gốc là bắt buộc").refine(
    (v) => v !== undefined && v >= 0,
    {
      message: "Giá gốc phải là số không âm",
    }
  ),

  Barcode: z.string().optional().nullable(),
  HSCode: z.string().optional().nullable(),
  CountryOfOrigin: z.string().optional().nullable(),

  WeightKg: requiredNumber("Khối lượng là bắt buộc").refine(
    (v) => v !== undefined && v >= 0,
    {
      message: "Khối lượng phải là số không âm",
    }
  ),
  LengthCm: requiredNumber("Chiều dài là bắt buộc").refine(
    (v) => v !== undefined && v >= 0,
    {
      message: "Dài phải là số không âm",
    }
  ),
  WidthCm: requiredNumber("Chiều rộng là bắt buộc").refine(
    (v) => v !== undefined && v >= 0,
    {
      message: "Rộng phải là số không âm",
    }
  ),
  HeightCm: requiredNumber("Chiều cao là bắt buộc").refine(
    (v) => v !== undefined && v >= 0,
    {
      message: "Cao phải là số không âm",
    }
  ),

  Version: requiredNumber("Version là bắt buộc")
    .refine(Number.isInteger, { message: "Version phải là số nguyên" })
    .refine((v) => v !== undefined && v >= 1, {
      message: "Version phải là số nguyên >= 1",
    }),

  ImageUrl: z.url({ message: "URL ảnh không hợp lệ" }).optional().nullable(),

  Status: coerceBool,

  Note: z.string().optional().nullable(),
});

export type ProductForm = z.infer<typeof productSchema>;
export const productFormResolver = zodResolver(productSchema);
