import z from "zod";

export const AccountCreateSchema = z.object({
  Name: z
    .string()
    .nonempty({ message: "Tên không được để trống" })
    .min(2, { message: "Tên tối thiểu 2 ký tự" }),

  Email: z
    .string()
    .nonempty({ message: "Email không được để trống" })
    .email({ message: "Email không hợp lệ" }),

  Phone: z
    .string()
    .nonempty({ message: "Số điện thoại không được để trống" })
    .min(8, { message: "Số điện thoại tối thiểu 8 ký tự" })
    .max(20, { message: "Số điện thoại quá dài" }),

  Avatar_url: z
    .string()
    .optional()
    .or(z.literal("").transform(() => ""))
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(val),
      { message: "Avatar URL không hợp lệ" }
    ),

  Status: z.boolean(),

  RoleId: z.string().nonempty({ message: "Vui lòng chọn vai trò" }),
});

export const AccountUpdateSchema = AccountCreateSchema.extend({
  Password: z.string().optional(),
});
