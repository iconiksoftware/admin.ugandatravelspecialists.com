import React, { useRef } from 'react';
import styles from './styles.module.scss';

interface MultipleImageInputProps {
  label: string;
  value: File[];
  onChange: (files: File[]) => void;
}

const MultipleImageInput: React.FC<MultipleImageInputProps> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files);
    onChange([...value, ...newFiles]);
    event.target.value = ''; // reset for next selection
  };

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.list}>
        <button type="button" className={styles.addBtn} onClick={() => fileInputRef.current?.click()}>
          +
        </button>
        {value.map((file, idx) => (
          <div key={idx} className={styles.item}>
            <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className={styles.preview} />
            <button type="button" className={styles.removeBtn} onClick={() => handleRemove(idx)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleFilesSelected} />
    </div>
  );
};

export default MultipleImageInput;
