import React from "react";
import styles from "./styles.module.scss"; // Component-specific styles

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Extend standard button attributes for full flexibility
  children: React.ReactNode; // The content of the button
  isLoading?: boolean; // Prop for loading state
  // disabled prop is already included via React.ButtonHTMLAttributes
  variant?: "primary" | "secondary" | "outline" | "danger"; // Optional: for different button styles
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  disabled, // Destructure disabled explicitly
  variant = "primary",
  className, // Allow custom classNames to be passed in
  ...rest // Capture any other native button props (type, onClick, etc.)
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        isLoading ? styles.loading : ""
      } ${className || ""}`}
      disabled={disabled || isLoading} // Button is disabled if explicitly disabled OR if isLoading
      {...rest} // Spread the rest of the native button props
    >
      {isLoading ? (
        <span className={styles.spinner}></span> // Simple spinner for loading state
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
