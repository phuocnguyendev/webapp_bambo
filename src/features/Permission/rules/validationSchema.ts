import z from "zod";

export const PermissionSchema = z.object({
  Name: z.string().nonempty({ message: "Tên nhóm quyền không được để trống" }),
  Code: z.string().nonempty({ message: "Mã nhóm quyền không được để trống" }),
});
