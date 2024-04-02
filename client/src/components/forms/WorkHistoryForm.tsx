"use client";

import React, { useCallback, useEffect } from "react";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import AddWorkExperienceForm from "./AddWorkExperienceForm";
import { useAppSelector } from "@/lib/reduxHooks";
import CustomButton from "../ui/CustomButton";
import AddedWorkExperienceList from "../ui/AddedWorkExperienceList";
import CustomListDiv from "../ui/CustomListDiv";
import { FormProps } from "@/utils/interface";

const WorkHistoryForm = ({ validateForm }: FormProps) => {
  const workExperiencesStoreData = useAppSelector(
    (state) => state.cv.workExperience
  );
  const [show, setShow] = React.useState(
    workExperiencesStoreData?.length < 1 ||
      workExperiencesStoreData === undefined
  );

  const toggleForm = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [setShow]
  );

  useEffect(() => {
    if (
      workExperiencesStoreData?.length <= 0 ||
      workExperiencesStoreData === undefined
    ) {
      toggleForm(true);
      validateForm(false);
    }

    if (workExperiencesStoreData?.length > 0) {
      validateForm(true);
    }
  }, [workExperiencesStoreData, toggleForm, validateForm]);
  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading>Add Your Professional Journey</CustomHeading>
      <CustomParagraph>
        Share your work experience to highlight your professional background.
        Include details about your roles, responsibilities, achievements, and
        the duration of each position to showcase your expertise and
        capabilities to potential employers.
      </CustomParagraph>

      <AddWorkExperienceForm toggleForm={toggleForm} isOpen={show} />

      {workExperiencesStoreData?.length > 0 && (
        <CustomListDiv>
          <div className="flex items-center justify-between">
            <h3 className=" text-lg font-FannGrotesqueProMid">
              Work history summary
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

          <AddedWorkExperienceList />
        </CustomListDiv>
      )}
    </CustomFormSection>
  );
};

export default WorkHistoryForm;
