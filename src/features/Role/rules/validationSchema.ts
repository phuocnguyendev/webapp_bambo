import z from "zod";

export const RoleSchema = z.object({
  Name: z.string().nonempty({ message: "Tên phân quyền không được để trống" }),
  Code: z.string().nonempty({ message: "Mã phân quyền không được để trống" }),
});
