import { ReactNode } from 'react';
import { Select, Label } from 'radix-ui';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './styles.module.scss';

interface Option {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectInputProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SelectInput = ({ label, value, onValueChange, options, placeholder = 'Select…', disabled = false, className }: SelectInputProps) => {
  return (
    <div>
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Label.Root className={styles.fieldLabel}>{label}</Label.Root>

        <Select.Trigger className={`${styles.trigger} ${className ?? ''}`} aria-label="Select">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={styles.icon}>
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.ScrollUpButton className={styles.scrollButton}>
              <ChevronUp size={16} />
            </Select.ScrollUpButton>

            <Select.Viewport className={styles.viewport}>
              {options.map((opt) => (
                <Select.Item key={opt.value} value={opt.value} className={styles.item}>
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className={styles.scrollButton}>
              <ChevronDown size={24} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectInput;
