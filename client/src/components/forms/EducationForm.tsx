"use client";

import React, { useCallback, useEffect, useState } from "react";
import CustomFormSection from "../ui/CustomFormSection";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import HintIcon from "../icons/HintIcon";
import { FormProps } from "@/utils/interface";
import CustomButton from "../ui/CustomButton";
import { useAppSelector } from "@/lib/reduxHooks";
import AddEducationForm from "./AddEducationForm";
import AddedEducationList from "../ui/AddedEducationList";

const EducationForm = ({ validateForm }: FormProps) => {
  const selectCvData = useAppSelector((state) => state.cv.education);
  const [show, setShow] = React.useState(true);

  const toggleForm = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [setShow]
  );

  useEffect(() => {
    if (selectCvData?.length <= 0 || selectCvData === undefined) {
      toggleForm(true);
      validateForm(false);
    }

    if (selectCvData?.length > 0) {
      validateForm(true);
    }
  }, [selectCvData, toggleForm, validateForm]);

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading> Add Your Educational Journey</CustomHeading>
      <CustomParagraph>
        {" "}
        Add your educational background here. Include details such as your
        degrees, diplomas, certificates, and any relevant achievements. This
        section is an opportunity to showcase your academic accomplishments and
        highlight your qualifications to potential employers.
      </CustomParagraph>

      <AddEducationForm isOpen={show} toggleForm={toggleForm} />

      {selectCvData?.length > 0 && (
        <div className="bg-gray-100 p-4 flex flex-col gap-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          {!show && (
            <CustomButton
              className="self-end px-4 py-2 hover:bg-azure/60"
              onClick={() => setShow(!show)}
            >
              Add More
            </CustomButton>
          )}
          <AddedEducationList />
        </div>
      )}
    </CustomFormSection>
  );
};

export default EducationForm;
