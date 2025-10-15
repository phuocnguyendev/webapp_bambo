import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Vui lòng nhập email" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .nonempty({ message: "Vui lòng nhập mật khẩu" })
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(255, { message: "Mật khẩu không được quá 255 ký tự" }),
  remember: z.boolean().optional(),
});
