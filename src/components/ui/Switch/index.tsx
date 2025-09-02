import * as React from 'react';

import { Switch as RadixSwitch } from 'radix-ui';

import styles from './styles.module.scss';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, label, id }) => {
  const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={switchId}>
          {label}
        </label>
      )}
      <RadixSwitch.Root id={switchId} className={styles.switchRoot} checked={checked} onCheckedChange={onCheckedChange}>
        <RadixSwitch.Thumb className={styles.switchThumb} />
      </RadixSwitch.Root>
    </div>
  );
};

export default Switch;
