import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const CustomButton = ({
  onClick,
  disabled,
  children,
  className,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 bg-blue-400 border font-FannGrotesqueProMid rounded-lg disabled:opacity-50 disabled:cursor-not-allowed  ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
