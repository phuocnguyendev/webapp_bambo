import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface CustomAlertProps {
  title: string;
  message: string;
  open: boolean;
  showClose?: boolean;
  showConfirm?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const CustomAlert = ({
  title,
  message,
  open,
  showClose = true,
  showConfirm = true,
  onClose,
  onConfirm,
}: CustomAlertProps) => {
  const { t } = useTranslation();

  if (!open) {
    return null;
  }
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription asChild>
          <div>{parse(message)}</div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          {showClose && (
            <AlertDialogCancel type="button" onClick={onClose}>
              {t("button.close")}
            </AlertDialogCancel>
          )}
          {showConfirm && (
            <AlertDialogAction type="button" onClick={onConfirm}>
              {t("button.yes")}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
