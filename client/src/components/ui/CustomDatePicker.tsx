"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../lib/PopoverSetup";
import { Calendar } from "../lib/CalenderSetup";
import { FieldError } from "react-hook-form";
import { SelectSingleEventHandler } from "react-day-picker";

interface CustomDatePickerProps {
  label?: string;
  error?: FieldError;
  placeholderText?: string;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  value?: Date | string;
}

const CustomDatePicker = React.forwardRef<
  HTMLInputElement,
  CustomDatePickerProps
>(function CustomDatePicker(
  { label, error, placeholderText, onChange, disabled, value },
  ref
) {
  const [date, setDate] = React.useState<Date | string | undefined>(value);

  React.useEffect(() => {
    if (value !== undefined) {
      setDate(value);
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <div className="w-full font-FannGrotesquePro flex flex-col">
      <label className="block text-sm  mb-1">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`flex items-center justify-start text-left py-4 px-4  border border-gray-500 text-sm focus:border-yaleBlue focus:ring-yaleBlue focus:outline-none w-full shrink-0 disabled:opacity-25 disabled:pointer-events-none  ${
              !date && "text-slate-400"
            }`}
            type="button"
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 " />
            {date instanceof Date ? (
              format(date, "PP")
            ) : (
              <span className="text-sm">{placeholderText}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date instanceof Date ? date : undefined}
            onSelect={handleDateSelect as SelectSingleEventHandler}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
