"use client";

import { useEffect, useMemo } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Title from "@/components/ui/title";
import RenderField from "@/components/RenderField";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  warehouseValidationSchema,
  type WarehouseForm,
} from "../rules/validationSchema";
import { useCreateWarehouse, useWarehouseUpdate } from "../hooks/useWarehouse";
import { STATUS_WAREHOUSE_OPTIONS } from "@/constants/common";

type Props = {
  open: boolean;
  data?: Partial<WarehouseForm> & { Id?: string };
  onOpenChange: (open: boolean) => void;
};

const defaultValues: DefaultValues<WarehouseForm> = {
  Name: "",
  Code: "",
  Address: "",
  Branch: "",
  Status: 1,
};

export default function CreateUpdateWarehouseModal({
  open,
  data,
  onOpenChange,
}: Props) {
  const form = useForm<WarehouseForm>({
    resolver: zodResolver(
      warehouseValidationSchema
    ) as unknown as Resolver<WarehouseForm>,
    defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutateAsync: createWarehouse, isPending: isCreating } =
    useCreateWarehouse();
  const { mutateAsync: updateWarehouse, isPending: isUpdating } =
    useWarehouseUpdate();

  useEffect(() => {
    if (!open) return;
    if (data?.Id) {
      form.reset({
        Name: data.Name ?? "",
        Code: data.Code ?? "",
        Branch: data.Branch ?? "",
        Address: data.Address ?? "",
        Status: typeof data.Status === "number" ? data.Status : 1,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [open, data, form]);

  const titleText = useMemo(
    () => (data?.Id ? "Cập nhật kho hàng" : "Thêm kho hàng"),
    [data]
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (!data?.Id) {
        await createWarehouse({
          ...values,
          Status: typeof values.Status === "number" ? values.Status : 1,
        } as Warehouse);
        toast.success("Tạo kho hàng thành công");
      } else {
        await updateWarehouse({
          ...values,
          Id: data.Id!,
          Status: typeof values.Status === "number" ? values.Status : 1,
        } as WarehouseResponse);
        toast.success("Cập nhật kho hàng thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["warehouse-list"] });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  });

  const handleSubmitAndReset = form.handleSubmit(async (values) => {
    try {
      await createWarehouse({
        ...values,
        Status: typeof values.Status === "number" ? values.Status : 1,
      } as Warehouse);
      toast.success("Tạo kho hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["warehouse-list"] });
      form.reset(defaultValues);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-1/2 transition-all duration-300 ease-in-out opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col gap-0">
        <DialogHeader className="sticky top-0 bg-white z-20 pb-4">
          <Title title={titleText} />
        </DialogHeader>

        <Form {...form}>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RenderField
                  control={form.control}
                  name="Name"
                  label="Tên kho hàng"
                  placeholder="Nhập tên kho hàng"
                  type="text"
                />
                <RenderField
                  control={form.control}
                  name="Code"
                  label="Mã kho hàng"
                  placeholder="Nhập mã kho hàng"
                  type="text"
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
                  name="Branch"
                  label="Chi nhánh kho"
                  placeholder="Nhập Chi nhánh"
                  type="text"
                />
                <div className="pb-2">
                  <RenderField
                    placeholder="Chọn trạng thái"
                    label="Trạng thái kho"
                    name="Status"
                    control={form.control}
                    options={STATUS_WAREHOUSE_OPTIONS}
                  />
                </div>
              </div>
              <div className="gap-2 sticky bottom-0 bg-white z-20 flex justify-end">
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
              </div>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
