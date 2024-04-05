"use client";

import React, { useCallback, useEffect, useState } from "react";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import { OnChangeValue } from "react-select";
import dynamic from "next/dynamic";
import {
  secondaryLanguagesList,
  primaryLanguagesList,
} from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { FormProps, OptionType } from "@/utils/interface";
import { setLanguage } from "@/features/cv/cvSlice";

const CustomDropdown = dynamic(() => import("../ui/CustomDropdown"), {
  ssr: false,
});

const LanguageForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const languageStoreData = useAppSelector((state) => state.cv.language);

  const defaultSecondaryLanguages = secondaryLanguagesList.filter((language) =>
    languageStoreData?.includes(language.label)
  );
  const defaultPrimaryLanguages = primaryLanguagesList.filter((language) =>
    languageStoreData?.includes(language)
  );

  const [selectedPrimaryLanguages, setSelectedPrimaryLanguages] = useState<
    string[]
  >(defaultPrimaryLanguages || []);

  const [selectedSecondaryLanguages, setSelectedSecondaryLanguages] = useState<
    OnChangeValue<OptionType, true>
  >(defaultSecondaryLanguages || []);

  const handleDropdownChange = useCallback(
    (selectedValues: OnChangeValue<OptionType, true>) => {
      setSelectedSecondaryLanguages(selectedValues);
    },
    [setSelectedSecondaryLanguages]
  );

  useEffect(() => {
    validateForm(true);
  }, [validateForm]);

  const toggleLanguage = (language: string) => {
    setSelectedPrimaryLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const languageData = [
      ...selectedPrimaryLanguages,
      ...selectedSecondaryLanguages.map((lang) => lang.value),
    ].filter((language, index, self) => self.indexOf(language) === index);
    dispatch(setLanguage(languageData));
  };

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading>Which languages can you work in?</CustomHeading>
      <CustomParagraph>
        Add any languages other than English you are comfortable working in, so
        we can show you relevant jobs.
      </CustomParagraph>

      <div className="p-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-4 font-FannGrotesquePro max-w-md mx-auto mt-5 ">
        {primaryLanguagesList.map((language) => (
          <div
            key={language}
            data-testid="language-tag"
            className={`p-2  rounded-md text-base cursor-pointer ${
              selectedPrimaryLanguages.includes(language)
                ? "bg-conflowerBlue text-white"
                : "bg-stone-300"
            }`}
            onClick={() => toggleLanguage(language)}
          >
            {language}
          </div>
        ))}
      </div>

      <div
        className="mt-2 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative"
        aria-activedescendant={undefined}
      >
        <h2 className="text-center font-FannGrotesqueProBook mb-2">
          Can&apos;t find a language above?
        </h2>
        <CustomDropdown
          onChange={handleDropdownChange}
          defaultLanguages={selectedSecondaryLanguages.map((lang) => lang)}
        />
      </div>
      <form onSubmit={onSubmit} ref={formRef}></form>
    </CustomFormSection>
  );
};

export default LanguageForm;
