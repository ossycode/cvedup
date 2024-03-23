"use client";

import React, { useEffect, useState } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import PhotoForm from "./forms/PhotoForm";
import SkillsForm from "./forms/SkillsForm";
import LanguageForm from "./forms/LanguageForm";
import WorkHistoryForm from "./forms/WorkHistoryForm";
import ReferencesForm from "./forms/ReferencesForm";
import SummaryForm from "./forms/SummaryForm";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./ui/CustomButton";
import CustomMotionComponent from "./ui/CustomMotionComponent";

const Step = ({ params }: { params: { step: string } }) => {
  const router = useRouter();
  const { step } = params;
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const steps: { [key: string]: JSX.Element } = {
    "personal-information": (
      <PersonalInfoForm validateForm={validateForm} formRef={formRef} />
    ),
    education: <EducationForm />,
    photo: <PhotoForm />,
    language: <LanguageForm />,
    skills: <SkillsForm />,
    "work-history": <WorkHistoryForm />,
    summary: <SummaryForm />,
    references: <ReferencesForm />,
  };

  const stepKeys = Object.keys(steps);
  const initialStepIndex = stepKeys.indexOf(step);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  function validateForm(value: boolean) {
    setIsFormValid(value);
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < stepKeys.length) {
      router.push(`/getting-started/${stepKeys[stepIndex]}`);
      setCurrentStepIndex(stepIndex);
    }
  };

  const goToPreviousStep = () => {
    goToStep(currentStepIndex - 1);
  };

  const goToNextStep = () => {
    if (currentStepIndex === stepKeys.length - 1) return;
    formRef.current?.requestSubmit();
    goToStep(currentStepIndex + 1);
  };

  const variants = {
    hidden: { opacity: 0, x: -200, transition: { duration: 0.5 } },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, x: 200, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-full grow flex flex-col">
      <CustomMotionComponent
        stepKeys={stepKeys}
        currentStepIndex={currentStepIndex}
        variants={variants}
      >
        {steps[stepKeys[currentStepIndex]]}
      </CustomMotionComponent>

      <footer className="flex items-center justify-center gap-9 fixed bottom-0 w-full p-4 bg-gray-200">
        <CustomButton
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
          className={` px-28  text-xl shadow-lg bg-transparent border-conflowerBlue ${
            currentStepIndex === 0 && "hidden"
          }`}
        >
          Back
        </CustomButton>

        <CustomButton
          onClick={goToNextStep}
          disabled={!isFormValid}
          className={` text-xl rounded-lg shadow-lg ${
            currentStepIndex === 0 ? "px-44" : "px-28"
          }`}
        >
          Next
        </CustomButton>
      </footer>
    </div>
  );
};
export default Step;
