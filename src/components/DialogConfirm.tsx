import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { t } from "i18next";

interface DialogConfirmProps {
  title?: string;
  message?: string;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  onClose?: () => void;
  onSubmit?: (data: boolean) => void;
  directionFooter?: "left" | "right";
  showModal?: boolean;
}

export default function DialogConfirm({
  title,
  message,
  confirmButtonTitle,
  cancelButtonTitle,
  onClose,
  onSubmit,
  directionFooter = "left",
  showModal = true,
}: DialogConfirmProps) {
  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.(true);
  };

  return (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{message}</DialogDescription>

        {directionFooter === "left" && (
          <DialogFooter className="sm:justify-start">
            <div className="flex gap-3">
              <Button variant={"destructive"} onClick={handleSubmit}>
                {confirmButtonTitle ?? t("button.yes")}
              </Button>
              <button
                className="text-danger hover:text-blue-800 hover:underline"
                onClick={handleClose}
              >
                {cancelButtonTitle ?? t("button.no")}
              </button>
            </div>
          </DialogFooter>
        )}
        {directionFooter === "right" && (
          <DialogFooter className="sm:justify-end">
            <div className="flex gap-3">
              <button
                className="text-danger hover:text-blue-800 hover:underline"
                onClick={handleClose}
              >
                {cancelButtonTitle ?? t("button.no")}
              </button>
              <Button variant={"destructive"} onClick={handleSubmit}>
                {confirmButtonTitle ?? t("button.yes")}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
