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
import CustomListDiv from "../ui/CustomListDiv";

const EducationForm = ({ validateForm }: FormProps) => {
  const selectCvData = useAppSelector((state) => state.cv.education);
  const [show, setShow] = React.useState(
    selectCvData?.length < 1 || selectCvData === undefined
  );

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
        highlight your qualifications to potential employers
      </CustomParagraph>

      <AddEducationForm isOpen={show} toggleForm={toggleForm} />

      {selectCvData?.length > 0 && (
        <CustomListDiv>
          <div className="flex justify-between">
            <h3 className=" text-lg font-FannGrotesqueProMid">
              Education history summary
            </h3>
            {!show && (
              <CustomButton
                className="self-end px-4 py-2 hover:bg-azure/60"
                onClick={() => setShow(!show)}
              >
                Add More
              </CustomButton>
            )}
          </div>
          <AddedEducationList />
        </CustomListDiv>
      )}
    </CustomFormSection>
  );
};

export default EducationForm;
