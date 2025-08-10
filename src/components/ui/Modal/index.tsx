import { Dialog as RadixDialog } from 'radix-ui';
import { X } from 'lucide-react';

import styles from './styles.module.scss';

interface ModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onCancel?: () => void;
  isLoading?: boolean;
}

const Modal = ({ title, description, children, open, setOpen, onCancel, className }: ModalProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content className={`${styles.content} ${className || ''}`}>
          <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
          {description && <RadixDialog.Description className={styles.description}>{description}</RadixDialog.Description>}
          <button
            className={styles.close}
            onClick={() => {
              setOpen?.(false);
              onCancel?.();
            }}
          >
            <X size={18} />
          </button>
          <div className={styles.body}>{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Modal;
