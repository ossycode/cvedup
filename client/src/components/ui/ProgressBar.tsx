import { TimerIcon } from "@radix-ui/react-icons";
import React from "react";

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  const percentage = (currentStep / steps) * 100;
  return currentStep === 0 ? (
    <div className=" bg-customGreen py-2 px-4 flex items-center justify-center gap-2 font-FannGrotesqueProSemiBold text-xs tracking-wide">
      <TimerIcon />
      <p>Your professional CV is few minutes away!</p>
    </div>
  ) : (
    <div
      className="flex w-full h-2  overflow-hidden "
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex flex-col justify-center overflow-hidden bg-customGreen text-xs text-white text-center whitespace-nowrap transition duration-500 "
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
