import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface UnsavedChangesAlertProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const UnsavedChangesAlert = ({
  open,
  onClose,
  onConfirm,
}: UnsavedChangesAlertProps) => {
  const { t } = useTranslation();

  if (!open) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('unSavedChanges.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('unSavedChanges.message')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" onClick={onClose}>
            {t('button.no')}
          </AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onConfirm}>
            {t('button.yes')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnsavedChangesAlert;
