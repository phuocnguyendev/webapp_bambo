import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { STATUS_WAREHOUSE_OPTIONS } from "@/constants/common";
import { FormProvider, useForm } from "react-hook-form";
import RenderField from "@/components/RenderField";
interface ModalBulkUpdateWarehouseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWarehouses: WarehouseResponse[];
  onBulkUpdate: (items: WarehouseResponse[]) => void;
}

const ModalBulkUpdateWarehouse: React.FC<ModalBulkUpdateWarehouseProps> = ({
  open,
  onOpenChange,
  selectedWarehouses,
  onBulkUpdate,
}) => {
  const form = useForm<{ status: number | "" }>({
    defaultValues: { status: "" },
  });
  React.useEffect(() => {
    if (open) form.reset({ status: "" });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <FormProvider {...form}>
          <DialogHeader>
            <DialogTitle>Cập nhật nhiều kho hàng</DialogTitle>
          </DialogHeader>
          <div>
            <p>Đã chọn {selectedWarehouses.length} kho hàng.</p>
          </div>
          <div className="my-4">
            <RenderField
              control={form.control}
              label="Chọn trạng thái"
              name="status"
              type="select"
              options={STATUS_WAREHOUSE_OPTIONS}
              placeholder="-- Chọn trạng thái --"
              className="col-span-9 md:col-span-4 lg:col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => {
                const status = form.getValues("status");
                onBulkUpdate(
                  selectedWarehouses.map((w) => ({
                    ...w,
                    Status: typeof status === "string" ? 0 : status,
                  }))
                );
              }}
              disabled={
                selectedWarehouses.length === 0 ||
                form.getValues("status") === ""
              }
            >
              Xác nhận cập nhật
            </Button>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBulkUpdateWarehouse;
