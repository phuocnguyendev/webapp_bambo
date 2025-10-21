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
import {
  useCreatePermission,
  usePermissionUpdate,
} from "../hooks/usePermission";
import { PermissionSchema } from "../rules/validationSchema";
import Title from "@/components/ui/title";
import RenderField from "../../../components/RenderField";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  data?: Partial<RoleUpdate>;
  onOpenChange: (open: boolean) => void;
};

const defaultValues = {
  Name: "",
  Code: "",
};
export default function CreateUpdateAccountModal({
  open,
  data,
  onOpenChange,
}: Props) {
  const form = useForm<z.infer<typeof PermissionSchema>>({
    resolver: zodResolver(PermissionSchema),
    defaultValues,
  });
  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreatePermission();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    usePermissionUpdate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (open && data?.Id && data) {
      form.reset({
        Name: data.Name ?? "",
        Code: data.Code ?? "",
      });
    }
    if (open && !data?.Id) {
      form.reset(defaultValues);
    }
  }, [open, data, form]);

  const titleText = useMemo(
    () => (data?.Id ? "Cập nhật nhóm quyền" : "Tạo nhóm quyền"),
    [data]
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (!data?.Id) {
        await createMutation(values as Role);
        toast.success("Tạo nhóm quyền thành công");
      } else {
        await updateMutation({
          ...values,
          Id: data.Id,
        } as RoleUpdate);
        toast.success("Cập nhật nhóm quyền thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["permission-list"] });
      onOpenChange(false);
    } catch (err) {
      console.log(err);
    }
  });

  const handleSubmitAndReset = form.handleSubmit(async (values) => {
    try {
      await createMutation(values as Role);
      toast.success("Tạo nhóm quyền thành công");
      queryClient.invalidateQueries({ queryKey: ["permission-list"] });
      form.reset(defaultValues);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="transition-all duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100">
        <DialogHeader>
          <Title title={titleText} />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="md:grid-cols-[200px_1fr] gap-6">
              <div className="space-y-4">
                <RenderField
                  control={form.control}
                  name="Name"
                  label="Tên nhóm quyền"
                  placeholder="Nhập tên nhóm quyền"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="Code"
                  label="Mã nhóm quyền"
                  placeholder="Nhập mã nhóm quyền"
                  type="text"
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
