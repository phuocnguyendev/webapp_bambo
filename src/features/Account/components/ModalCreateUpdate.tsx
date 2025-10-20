import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateAccount,
  useGetOptionRole,
  useUpdateAccount,
} from "../hooks/useAccount";
import {
  AccountCreateSchema,
  AccountUpdateSchema,
} from "../rules/validationSchema";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import RenderField from "../../../components/RenderField";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  open: boolean;
  data?: Partial<AccountUpdate>;
  onOpenChange: (open: boolean) => void;
};

const defaultValues = {
  Name: "",
  Email: "",
  Phone: "",
  Avatar_url: "",
  Password: "",
  Status: true,
  RoleId: "",
};
export default function CreateUpdateAccountModal({
  open,
  data,
  onOpenChange,
}: Props) {
  const isUpdate = !!data?.Id;
  const form = useForm<z.infer<typeof AccountCreateSchema>>({
    resolver: zodResolver(isUpdate ? AccountUpdateSchema : AccountCreateSchema),
    defaultValues,
  });
  const { data: roleOptions } = useGetOptionRole(open);
  const queryClient = useQueryClient();
  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAccount();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAccount();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open && isUpdate && data) {
      form.reset({
        Name: data.Name ?? "",
        Email: data.Email ?? "",
        Phone: data.Phone ?? "",
        Avatar_url: data.Avatar_url ?? "",
        Status: data.Status ?? true,
        RoleId: data.RoleId ?? "",
      });
    }
    if (open && !isUpdate) {
      form.reset(defaultValues);
    }
  }, [open, data, form]);

  const titleText = useMemo(
    () => (data?.Id ? "Cập nhật tài khoản" : "Tạo tài khoản"),
    [data]
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (!data?.Id) {
        await createMutation(values as Account);
        toast.success("Tạo tài khoản thành công");
      } else {
        await updateMutation({
          ...values,
          Id: data.Id,
        } as AccountUpdate);
        toast.success("Cập nhật tài khoản thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["accountList"] });
      onOpenChange(false);
    } catch (err: any) {
      if (
        err?.response?.status === 409 &&
        err?.response?.data?.message?.includes("Email")
      ) {
        form.setError("Email", {
          type: "manual",
          message: "Email đã tồn tại!",
        });
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  });

  const handleSubmitAndReset = form.handleSubmit(async (values) => {
    try {
      await createMutation(values as Account);
      toast.success("Tạo tài khoản thành công");
      queryClient.invalidateQueries({ queryKey: ["accountList"] });
      form.reset(defaultValues);
    } catch (err: any) {
      if (
        err?.response?.status === 409 &&
        err?.response?.data?.message?.includes("Email")
      ) {
        form.setError("Email", {
          type: "manual",
          message: "Email đã tồn tại!",
        });
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  });

  const avatar = form.watch("Avatar_url");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl transition-all duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100">
        <DialogHeader>
          <Title title={titleText} />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
              <div className="space-y-3">
                <div
                  className={cn(
                    "relative rounded-md overflow-hidden transition-all duration-300",
                    avatar ? "h-48 border-none" : "h-32 border-2 border-dashed"
                  )}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="absolute inset-0 h-full w-full rounded-md"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-center">
                      <div className="h-12 w-12 rounded-full grid place-items-center border">
                        <span className="text-xl">+</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Chọn ảnh đại diện
                      </div>
                    </div>
                  )}
                </div>
                <RenderField
                  control={form.control}
                  name="Avatar_url"
                  label="Ảnh đại diện"
                  placeholder="Dán URL ảnh đại diện"
                  type="text"
                />
              </div>
              <div className="space-y-4">
                <RenderField
                  control={form.control}
                  name="Name"
                  label={"Họ và tên"}
                  placeholder="Nhập họ và tên"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="Phone"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="Email"
                  label="Địa chỉ email"
                  placeholder="Nhập địa chỉ email"
                  type="email"
                  disabled={!!data?.Id}
                />
                {!data?.Id && (
                  <div className="relative">
                    <RenderField
                      control={form.control}
                      name="Password"
                      label="Mật khẩu"
                      placeholder="Nhập mật khẩu"
                      type={showPassword ? "text" : "password"}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center mt-6"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}

                <RenderField
                  control={form.control}
                  name="RoleId"
                  label="Vai trò"
                  options={roleOptions}
                  placeholder="Chọn vai trò"
                />
                <RenderField
                  control={form.control}
                  name="Status"
                  label="Trạng thái"
                  isSwitch
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Đóng
              </Button>
              {data?.Id ? null : (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isCreating}
                  onClick={handleSubmitAndReset}
                >
                  Lưu & Thêm mới
                </Button>
              )}
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? "Đang lưu…" : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
