
import React from 'react';
import { Control, useController } from 'react-hook-form';
import styles from "./input-field.module.scss";

export interface InputFieldProps {
  name: string,
  control: Control<any>,
  type?: string,
  label?: string,
  placeholder?: string
}

export function InputField ({name, control, label, type, placeholder} : InputFieldProps) {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { isDirty, isTouched, invalid ,error }
  } = useController({
    name,
    control
  });

  return (
    <div className={styles.formGroup}>
      <label htmlFor="">{label}: </label>
      <input 
        type={type || "text"} 
        placeholder={placeholder || ""}
        onChange={(e) => onChange(e.target.value)} 
        value={value} 
        ref={ref} />
    </div>
  );
}
