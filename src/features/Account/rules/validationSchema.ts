import z from "zod";

export const AccountSchema = z.object({
  Name: z.string().min(2, { error: "Tên tối thiểu 2 ký tự" }),
  Email: z.email({ error: "Email không hợp lệ" }),
  Phone: z
    .string()
    .min(8, { error: "Số điện thoại tối thiểu 8 ký tự" })
    .max(20, { error: "Số điện thoại quá dài" }),
  Avatar_url: z
    .url({ error: "Avatar URL không hợp lệ" })
    .or(z.literal("").transform(() => "")),
  Status: z.boolean(),
  RoleId: z.string().min(1, { error: "Vui lòng chọn vai trò" }),
});
