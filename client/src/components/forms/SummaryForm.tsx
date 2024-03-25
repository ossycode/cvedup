import React, { useEffect } from "react";
import CustomFormSection from "../ui/CustomFormSection";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import HintIcon from "../icons/HintIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvDataSchema } from "@/utils/validation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { z } from "zod";
import { setSummary } from "@/features/cv/cvSlice";
import { FormProps } from "@/utils/interface";

interface SummaryFormData {
  summary: string;
}

const SummaryForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const selectCvData = useAppSelector((state) => state.cv.summary);

  const summarySchema = z.object({
    summary: cvDataSchema.shape.summary,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    mode: "onTouched",
    defaultValues: {
      summary: selectCvData,
    },
  });

  useEffect(() => {
    validateForm(isValid);
  }, [isValid, validateForm]);

  const onSubmit = (data: SummaryFormData) => {
    dispatch(setSummary(data.summary));
  };

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>

      <CustomHeading> Craft Your Professional Summary</CustomHeading>
      <CustomParagraph>
        Provide a brief summary highlighting your key skills, experiences, and
        career objectives. This section is your opportunity to showcase your
        unique strengths and qualifications, giving potential employers insight
        into what you can bring to their organization
      </CustomParagraph>

      <form
        className=" p-8 mt-4  mx-auto max-w-3xl pb-24"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <div>
          <label htmlFor="summary-input" className="block text-sm  mb-1">
            Summary
          </label>
          <div className="relative">
            <textarea
              id="summary-input"
              className="w-full rounded-lg py-4 px-4 block border border-gray-500 text-sm focus:border-yaleBlue focus:ring-yaleBlue focus:outline-none"
              rows={6}
              placeholder="Write your summary here..."
              aria-describedby="summary-error"
              {...register("summary")}
            ></textarea>
            <div className="absolute top-0 end-0 flex items-center pointer-events-none p-3">
              <svg
                className={`flex-shrink-0 size-4 text-red-500 transition-opacity duration-500 ease-in-out ${
                  errors.summary ? " opacity-100" : "invisible opacity-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
          </div>
          <span
            id="summary-error"
            className={`text-sm text-red-600 mt-2 transition-opacity duration-500 ease-in-out ${
              errors.summary ? " opacity-100" : "invisible opacity-0"
            }`}
          >
            {errors.summary?.message}
          </span>
        </div>
      </form>
    </CustomFormSection>
  );
};

export default SummaryForm;
