import { requiredNumber } from "@/utils/utils";
import { z } from "zod";

export const warehouseValidationSchema = z.object({
  Code: z
    .string()
    .nonempty({ message: "Mã kho không được để trống" })
    .min(2, { message: "Mã kho phải có ít nhất 2 ký tự" })
    .max(20, { message: "Mã kho không được vượt quá 20 ký tự" }),
  Name: z
    .string()
    .nonempty({ message: "Tên kho không được để trống" })
    .min(2, { message: "Tên kho phải có ít nhất 2 ký tự" })
    .max(200, { message: "Tên kho không được vượt quá 200 ký tự" }),
  Address: z
    .string()
    .nonempty({ message: "Địa chỉ kho không được để trống" })
    .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" })
    .max(200, { message: "Địa chỉ không được vượt quá 200 ký tự" }),
  Branch: z.string().optional().nullable(),
  Status: requiredNumber("Trạng thái kho không được để trống"),
});
export type WarehouseForm = z.infer<typeof warehouseValidationSchema>;
