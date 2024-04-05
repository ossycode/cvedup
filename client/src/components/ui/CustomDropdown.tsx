"use client";

import React, { useId } from "react";
import Select, { OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import { secondaryLanguagesList } from "@/utils/constants";
import { OptionType } from "@/utils/interface";

interface CustomDropdownProps {
  onChange: (selectedOptions: OnChangeValue<OptionType, true>) => void;
  defaultLanguages: {
    value: string;
    label: string;
  }[];
}
const animatedComponents = makeAnimated();

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  onChange,
  defaultLanguages,
}) => {
  return (
    <Select
      aria-activedescendant={undefined}
      instanceId={useId()}
      closeMenuOnSelect={true}
      components={animatedComponents}
      placeholder="Type language here..."
      isMulti
      defaultValue={[...defaultLanguages]}
      options={secondaryLanguagesList}
      onChange={onChange}
      className=" items-center justify-center font-FannGrotesqueProBook "
      classNamePrefix=""
      styles={{
        option: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
        placeholder: (base) => ({
          ...base,
          textAlign: "center",
          color: "gray",
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#4C91FF",
          borderRadius: 3,
          border: "1px solid #d6d3d1",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#fafafa",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "white",
          ":hover": {
            backgroundColor: "#44403c",
          },
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 2,
        colors: {
          ...theme.colors,
          primary25: "#4C91FF",
          primary: "#1f2937",
        },
      })}
    />
  );
};

export default CustomDropdown;
