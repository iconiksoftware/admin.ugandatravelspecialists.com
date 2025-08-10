import { AlertDialog as RadixAlertDialog } from 'radix-ui';

import styles from './styles.module.scss';

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const AlertDialog = ({
  open = false,
  setOpen,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={setOpen}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className={styles.overlay} />
        <RadixAlertDialog.Content className={styles.content}>
          <RadixAlertDialog.Title className={styles.title}>{title}</RadixAlertDialog.Title>

          {description && <RadixAlertDialog.Description className={styles.description}>{description}</RadixAlertDialog.Description>}

          <div className={styles.actions}>
            <RadixAlertDialog.Cancel asChild>
              <button
                className={styles.cancel}
                onClick={() => {
                  setOpen(false);
                  onCancel?.();
                }}
              >
                {cancelText}
              </button>
            </RadixAlertDialog.Cancel>

            <RadixAlertDialog.Action asChild>
              <button className={styles.confirmButton} onClick={onConfirm} disabled={isLoading}>
                {isLoading ? <span className={styles.spinner} /> : confirmText}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

export default AlertDialog;
