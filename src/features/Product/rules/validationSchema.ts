import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const coerceNumber = (schema: z.ZodNumber) =>
  z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    if (typeof val === "string") {
      const s = val.replace(/\s+/g, "").replace(",", ".");
      const n = Number(s);
      return Number.isFinite(n) ? n : undefined;
    }
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
  }, schema.optional());

const coerceBool = z.preprocess((val) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") {
    const v = val.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(v)) return true;
    if (["false", "0", "no", "off"].includes(v)) return false;
    if (v === "") return undefined;
  }
  if (val == null) return undefined;
  return val;
}, z.boolean()); // .optional() nếu muốn

export const productSchema = z.object({
  Code: z.string().min(1, { message: "Mã sản phẩm là bắt buộc" }),
  Sku: z.string().optional().nullable(),
  Name: z.string().min(1, { message: "Tên sản phẩm là bắt buộc" }),
  Material: z.string().optional().nullable(),
  SpecText: z.string().optional().nullable(),
  Uom: z.string().optional().nullable(),

  BaseCost: coerceNumber(
    z.number().nonnegative({ message: "Giá gốc phải là số không âm" })
  ),

  Barcode: z.string().optional().nullable(),
  HSCode: z.string().optional().nullable(),
  CountryOfOrigin: z.string().optional().nullable(),

  WeightKg: coerceNumber(
    z.number().nonnegative({ message: "Khối lượng phải là số không âm" })
  ),
  LengthCm: coerceNumber(
    z.number().nonnegative({ message: "Dài phải là số không âm" })
  ),
  WidthCm: coerceNumber(
    z.number().nonnegative({ message: "Rộng phải là số không âm" })
  ),
  HeightCm: coerceNumber(
    z.number().nonnegative({ message: "Cao phải là số không âm" })
  ),

  Version: coerceNumber(
    z.number().int().min(1, { message: "Version phải là số nguyên >= 1" })
  ),

  ImageUrl: z
    .string()
    .url({ message: "URL ảnh không hợp lệ" })
    .optional()
    .nullable(),

  Status: coerceBool, // 👈 xử lý đầy đủ các biến thể

  Note: z.string().optional().nullable(),
});

export type ProductForm = z.infer<typeof productSchema>;
export const productFormResolver = zodResolver(productSchema);
