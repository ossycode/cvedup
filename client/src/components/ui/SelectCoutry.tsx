"use client";

import * as React from "react";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/lib/SelectSetup";
import { countriesList } from "@/utils/constants";
import { FieldError } from "react-hook-form";

const SelectCountry = React.forwardRef<
  HTMLButtonElement,
  { error?: FieldError; onValueChange: (value: string) => void; value?: string }
>(function SelectCountry({ error, onValueChange, value }, ref) {
  return (
    <div className="w-full font-FannGrotesquePro">
      <Label.Root htmlFor="country-select" className="block text-sm mb-1">
        Country
      </Label.Root>
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger id="country-select" ref={ref}>
          <SelectValue
            placeholder={
              <span className="text-slate-400">Select your country</span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {countriesList.map((country) => (
            <SelectItem key={country.name} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <span className="text-red-500 mt-1 text-sm block">{error.message}</span>
      )}
    </div>
  );
});

SelectCountry.displayName = "SelectCountry";

export default SelectCountry;
