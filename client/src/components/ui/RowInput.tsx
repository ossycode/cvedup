import React, { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputRowProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const InputRow = forwardRef<HTMLInputElement, InputRowProps>(function InputRow(
  { label, error, ...rest },
  ref
) {
  return (
    <div className="w-full font-FannGrotesquePro flex flex-col">
      <label className="block text-sm  mb-1">{label}</label>
      <input
        {...rest}
        ref={ref}
        className="py-4 px-4 block border  border-gray-500  text-sm focus:border-yaleBlue focus:ring-yaleBlue focus:outline-none w-full "
      />
      <span
        className={`text-red-500 mt-1 text-xs block transition-all duration-300 ease-in-out shrink-0 min-h-8 ${
          error ? "opacity-100" : "invisible opacity-0"
        }`}
      >
        {error?.message}
      </span>
    </div>
  );
});

InputRow.displayName = "InputRow";

export default InputRow;
