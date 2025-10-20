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
    .regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ")
    .nonempty("Số điện thoại không được để trống"),

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
  Password: z.string().optional(),
  RoleId: z.string().nonempty({ message: "Vui lòng chọn vai trò" }),
});

export const AccountUpdateSchema = AccountCreateSchema.extend({
  Password: z.string().optional(),
});

export const PermissionSchema = z.object({
  Name: z.string().nonempty({ message: "Tên không được để trống" }),
  Code: z.string().nonempty({ message: "Mã không được để trống" }),
});
