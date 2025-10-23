import { useEffect, useMemo } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Title from "@/components/ui/title";
import RenderField from "@/components/RenderField";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import {
  supplierValidationSchema,
  type SupplierForm,
} from "../rules/validationSchema";
import { useCreateSupplier, useSupplierUpdate } from "../hooks/useSupplier";

type Props = {
  open: boolean;
  data?: Partial<SupplierForm> & { Id?: string };
  onOpenChange: (open: boolean) => void;
};

const defaultValues: DefaultValues<SupplierForm> = {
  Name: "",
  TaxCode: "",
  Phone: "",
  Email: "",
  Address: "",
  Rating: 0,
  LeadTime: 1,
};

export default function CreateUpdateSupplierModal({
  open,
  data,
  onOpenChange,
}: Props) {
  const form = useForm<SupplierForm>({
    resolver: zodResolver(
      supplierValidationSchema
    ) as unknown as Resolver<SupplierForm>,
    defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutateAsync: createSupplier, isPending: isCreating } =
    useCreateSupplier();
  const { mutateAsync: updateSupplier, isPending: isUpdating } =
    useSupplierUpdate();

  useEffect(() => {
    if (!open) return;
    if (data?.Id) {
      form.reset({
        Name: data.Name ?? "",
        TaxCode: data.TaxCode ?? "",
        Phone: data.Phone ?? "",
        Email: data.Email ?? "",
        Address: data.Address ?? "",
        Rating: typeof data.Rating === "number" ? data.Rating : 0,
        LeadTime: typeof data.LeadTime === "number" ? data.LeadTime : 1,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [open, data, form]);

  const titleText = useMemo(
    () => (data?.Id ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"),
    [data]
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (!data?.Id) {
        await createSupplier({
          ...values,
          Rating: typeof values.Rating === "number" ? values.Rating : 0,
          LeadTime: typeof values.LeadTime === "number" ? values.LeadTime : 1,
        } as unknown as Supplier);
        toast.success("Tạo nhà cung cấp thành công");
      } else {
        await updateSupplier({
          ...values,
          Id: data.Id!,
          Rating: typeof values.Rating === "number" ? values.Rating : 0,
          LeadTime: typeof values.LeadTime === "number" ? values.LeadTime : 1,
        } as unknown as SupplierResponse);
        toast.success("Cập nhật nhà cung cấp thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["supplier-list"] });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  });

  const handleSubmitAndReset = form.handleSubmit(async (values) => {
    try {
      await createSupplier({
        ...values,
        Rating: typeof values.Rating === "number" ? values.Rating : 0,
        LeadTime: typeof values.LeadTime === "number" ? values.LeadTime : 1,
      } as unknown as Supplier);
      toast.success("Tạo nhà cung cấp thành công");
      queryClient.invalidateQueries({ queryKey: ["supplier-list"] });
      form.reset(defaultValues);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl transition-all duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <Title title={titleText} />
        </DialogHeader>

        <Form {...form}>
          <div className="overflow-auto px-0 py-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RenderField
                  control={form.control}
                  name="Name"
                  label="Tên nhà cung cấp"
                  placeholder="Nhập tên nhà cung cấp"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="TaxCode"
                  label="Mã số thuế"
                  placeholder="Nhập mã số thuế"
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
                  label="Email"
                  placeholder="Nhập email"
                  type="email"
                />
                <RenderField
                  control={form.control}
                  name="Address"
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="Rating"
                  label="Đánh giá (0-5)"
                  type="number"
                />
                <RenderField
                  control={form.control}
                  name="LeadTime"
                  label="Thời gian giao hàng (ngày)"
                  type="number"
                />
              </div>
            </form>
          </div>

          <DialogFooter className="gap-2 sticky bottom-0 bg-white z-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Đóng
            </Button>

            {!data?.Id && (
              <Button
                type="button"
                variant="secondary"
                disabled={isCreating}
                onClick={handleSubmitAndReset}
              >
                Lưu & Thêm mới
              </Button>
            )}

            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              onClick={handleSubmit}
            >
              {isCreating || isUpdating ? "Đang lưu…" : "Lưu"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
