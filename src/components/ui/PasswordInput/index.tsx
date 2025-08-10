import React, { useState } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // For password visibility toggle
import styles from "./styles.module.scss"; // Component-specific styles

// Define a generic type for form data for better reusability
interface FormValues extends Record<string, any> {}

interface PasswordInputProps {
  label: string;
  name: string;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  placeholder?: string;
  autoComplete?: string;
  className?: string; // Allow optional className for external styling if needed
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  control,
  errors,
  placeholder,
  autoComplete,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles.formGroup} ${className || ""}`}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.passwordInputWrapper}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"} // Toggle type based on state
              id={name}
              placeholder={placeholder}
              // Apply inputError class if there's an error for this field
              className={errors[name] ? styles.inputError : ""}
              autoComplete={autoComplete}
              aria-invalid={errors[name] ? "true" : "false"} // ARIA attribute for accessibility
            />
          )}
        />
        <button
          type="button" // Important: type="button" to prevent form submission
          className={styles.togglePasswordVisibility}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {/* Display the error message specific to this input field */}
      {errors[name] && (
        <p role="alert" className={styles.inputErrorMessage}>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
