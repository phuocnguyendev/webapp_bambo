import { requiredNumber } from "@/utils/utils";
import { z } from "zod";

export const supplierValidationSchema = z.object({
  Name: z
    .string()
    .min(2, { message: "Tên nhà cung cấp phải có ít nhất 2 ký tự" })
    .max(100, { message: "Tên nhà cung cấp không được vượt quá 100 ký tự" }),

  TaxCode: z
    .string()
    .min(1, { message: "Mã số thuế không được để trống" })
    .regex(/^[0-9]{8,15}$/, {
      message: "Mã số thuế phải là dãy số từ 8 đến 15 chữ số",
    }),

  Phone: z
    .string()
    .regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ"),

  Email: z
    .email({ message: "Email không hợp lệ" })
    .max(100, { message: "Email không được vượt quá 100 ký tự" }),

  Address: z
    .string()
    .nonempty({ message: "Địa chỉ không được để trống" })
    .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" })
    .max(200, { message: "Địa chỉ không được vượt quá 200 ký tự" }),

  Rating: requiredNumber(
    "Đánh giá không được để trống",
    "Đánh giá phải là số hợp lệ"
  )
    .refine((v) => v !== undefined && v >= 0, {
      message: "Đánh giá không được nhỏ hơn 0",
    })
    .refine((v) => v !== undefined && v <= 5, {
      message: "Đánh giá tối đa là 5 sao",
    }),

  LeadTime: requiredNumber("Thời gian giao hàng không được để trống")
    .refine(Number.isInteger, {
      message: "Thời gian giao hàng phải là số nguyên",
    })
    .refine((v) => v !== undefined && v >= 1, {
      message: "Thời gian giao hàng tối thiểu là 1 ngày",
    })
    .refine((v) => v !== undefined && v <= 60, {
      message: "Thời gian giao hàng tối đa là 60 ngày",
    }),
});

export type SupplierForm = z.infer<typeof supplierValidationSchema>;
