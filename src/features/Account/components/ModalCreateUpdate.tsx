import { useEffect, useMemo } from "react";
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
import { toast } from "@/components/ui/use-toast";
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
  const { data: roleOptions } = useGetOptionRole();
  const queryClient = useQueryClient();
  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAccount();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAccount();

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
        await createMutation(values as unknown as Account);
        toast({ title: "Tạo tài khoản thành công" });
      } else {
        await updateMutation({
          ...(values as unknown as Account),
          Id: data.Id,
        } as AccountUpdate);
        toast({ title: "Cập nhật tài khoản thành công" });
      }
      queryClient.invalidateQueries({ queryKey: ["accountList"] });
      onOpenChange(false);
    } catch (err) {
      toast({ title: "Có lỗi xảy ra", description: String(err) });
    }
  });

  const avatar = form.watch("Avatar_url");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
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
                      className="absolute inset-0 h-full w-full object-cover rounded-md"
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
                  <RenderField
                    control={form.control}
                    name="Password"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
                  />
                )}
                <RenderField
                  control={form.control}
                  name="RoleId"
                  label="Vai trò"
                  options={roleOptions}
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
              <Button
                type="submit"
                variant="secondary"
                disabled={isCreating || isUpdating}
              >
                Lưu & Thêm mới
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating
                  ? data?.Id
                    ? "Đang lưu…"
                    : "Đang tạo…"
                  : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
