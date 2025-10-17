import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode, KeyboardEvent } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

type ModalDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  title?: ReactNode; // dòng mô tả chính (optional)
  children?: ReactNode; // nội dung bổ sung (optional)
  labelOK?: ReactNode;
  labelCancel?: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  modalClassname?: string;
  btnOkProps?: React.ComponentProps<typeof Button>;
  btnCancelProps?: React.ComponentProps<typeof Button>;
  confirmOnEnter?: boolean;
};

export default function ModalDelete({
  open,
  onOpenChange,
  onOk,
  onCancel,
  title,
  children,
  labelOK = "Xóa",
  labelCancel = "Đóng",
  loading,
  icon,
  modalClassname,
  btnOkProps,
  btnCancelProps,
  confirmOnEnter = true,
}: ModalDeleteProps) {
  const handleOk = async () => {
    if (loading) return;
    if (onOk) await onOk();
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (loading) return;
    onCancel?.();
    onOpenChange(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (loading) return;
    if (confirmOnEnter && e.key === "Enter") {
      e.preventDefault();
      handleOk();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => (!loading ? onOpenChange(o) : void 0)}
    >
      <DialogContent
        role="alertdialog"
        aria-describedby="modal-delete-desc"
        className={cn(
          "sm:max-w-md rounded-2xl border border-border/50 p-6 shadow-2xl",
          "bg-white text-foreground",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "focus:outline-none",
          modalClassname
        )}
        onInteractOutside={(e) => loading && e.preventDefault()}
        onEscapeKeyDown={(e) => loading && e.preventDefault()}
        onKeyDown={onKeyDown}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm">
            {icon ?? <AlertTriangle className="h-6 w-6" aria-hidden />}
          </div>

          <DialogTitle className="text-lg font-semibold text-red-600">
            Thông báo
          </DialogTitle>

          {(title || children) && (
            <DialogDescription
              id="modal-delete-desc"
              className="mt-2 text-center text-sm text-muted-foreground"
            >
              {title || children}
            </DialogDescription>
          )}
        </DialogHeader>

        {title && children && (
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {children}
          </div>
        )}

        <DialogFooter className="mt-5 flex w-full items-center justify-center gap-3 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={!!loading}
            className="min-w-[100px] rounded-xl border-gray-300 bg-white hover:bg-gray-50"
            {...btnCancelProps}
          >
            {labelCancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleOk}
            disabled={!!loading}
            className="min-w-[100px] rounded-xl shadow-sm hover:shadow-md transition-all"
            {...btnOkProps}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span>Đang xóa…</span>
              </span>
            ) : (
              labelOK
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
