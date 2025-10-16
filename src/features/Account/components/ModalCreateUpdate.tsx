import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// label is provided via FormLabel wrapper; no direct import needed here
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateAccount, useUpdateAccount } from "../hooks/useAccount";

type Account = {
  Name: string;
  Email: string;
  Avatar_url: string;
  Status: boolean;
  Phone: string;
  RoleId: string;
};

type AccountUpdate = Account & { Id: string };

type Props = {
  open: boolean;
  defaultValues?: Partial<AccountUpdate>;
  onOpenChange: (open: boolean) => void;
};

const schema = z.object({
  Name: z.string().min(2, { error: "Tên tối thiểu 2 ký tự" }),
  Email: z.string().email({ error: "Email không hợp lệ" }),
  Phone: z
    .string()
    .min(8, { error: "Số điện thoại tối thiểu 8 ký tự" })
    .max(20, { error: "Số điện thoại quá dài" }),
  Avatar_url: z
    .string()
    .url({ error: "Avatar URL không hợp lệ" })
    .or(z.literal("").transform(() => "")),
  Status: z.boolean(),
  RoleId: z.string().min(1, { error: "Vui lòng chọn vai trò" }),
});
type FormValues = z.infer<typeof schema>;

export default function CreateUpdateAccountModal({
  open,
  defaultValues,
  onOpenChange,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      Name: "",
      Email: "",
      Phone: "",
      Avatar_url: "",
      Status: true,
      RoleId: "",
    },
  });
  useEffect(() => {
    const isUpdate = !!defaultValues?.Id;
    if (open && isUpdate && defaultValues) {
      form.reset({
        Name: defaultValues.Name ?? "",
        Email: defaultValues.Email ?? "",
        Phone: defaultValues.Phone ?? "",
        Avatar_url: defaultValues.Avatar_url ?? "",
        Status: defaultValues.Status ?? true,
        RoleId: defaultValues.RoleId ?? "",
      });
    }
    if (open && !isUpdate) {
      form.reset({
        Name: "",
        Email: "",
        Phone: "",
        Avatar_url: "",
        Status: true,
        RoleId: "",
      });
    }
  }, [open, defaultValues, form]);

  const titleText = useMemo(
    () => (defaultValues?.Id ? "Cập nhật tài khoản" : "Tạo tài khoản"),
    [defaultValues]
  );

  const queryClient = useQueryClient();
  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (!defaultValues?.Id) {
        await createMutation.mutateAsync(values as unknown as Account);
        toast({ title: "Tạo tài khoản thành công" });
      } else {
        await updateMutation.mutateAsync({
          ...(values as unknown as Account),
          Id: defaultValues.Id,
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription>
            {defaultValues?.Id
              ? "Chỉnh sửa thông tin người dùng."
              : "Nhập thông tin để tạo mới người dùng."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        autoComplete="email"
                        {...field}
                        disabled={!!defaultValues?.Id}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="090..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="RoleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <FormControl>
                      <Select
                      // value={
                      //   roles.find((r) => r.id === field.value)
                      //     ? {
                      //         value: field.value,
                      //         label: roles.find((r) => r.id === field.value)!
                      //           .label,
                      //       }
                      //     : null
                      // }
                      // onChange={(opt: unknown) => {
                      //   const o = opt as {
                      //     value: string;
                      //     label: string;
                      //   } | null;
                      //   field.onChange(o ? o.value : "");
                      // }}
                      // options={roles.map((r) => ({
                      //   value: r.id,
                      //   label: r.label,
                      // }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="Avatar_url"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-xs text-muted-foreground">
                        N/A
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="m-0">Kích hoạt</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={
                  createMutation.status === "pending" ||
                  updateMutation.status === "pending"
                }
              >
                {createMutation.status === "pending" ||
                updateMutation.status === "pending"
                  ? defaultValues?.Id
                    ? "Đang lưu…"
                    : "Đang tạo…"
                  : defaultValues?.Id
                  ? "Lưu thay đổi"
                  : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
