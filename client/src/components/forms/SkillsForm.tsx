import React from "react";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";

const SkillsForm = () => {
  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading> Share Your Superpowers</CustomHeading>
      <CustomParagraph>
        Enhance your CV by adding your skills. Include both technical and soft
        skills to showcase your abilities and strengths to potential employers
      </CustomParagraph>

      <form className="mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative">
        <h2 className="font-lg font-FannGrotesqueProMid text-gray-900">
          Highlight relevant skills for the job you want
        </h2>
      </form>
    </CustomFormSection>
  );
};

export default SkillsForm;
