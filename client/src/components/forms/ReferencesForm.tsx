"use client";

import React, { useEffect, useState } from "react";
import { FormProps } from "@/utils/interface";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import CustomRadioButton from "../ui/CustomRadioButton";
import InputRow from "../ui/RowInput";
import CustomButton from "../ui/CustomButton";
import CustomListDiv from "../ui/CustomListDiv";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { motion } from "framer-motion";
import { toggleFormVariant } from "@/utils/constants";
import { CvData, referencesObject } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReference } from "@/features/cv/cvSlice";
import AddedReferenceList from "../ui/AddedReferenceList";

const ReferencesForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const referencesStoreData = useAppSelector((state) => state.cv.references);

  const [isAddingReferences, setIsAddingReferences] = useState<string | null>(
    referencesStoreData ? "yes" : null
  );
  const [show, setShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CvData["references"][0]>({
    resolver: zodResolver(referencesObject),
    mode: "onTouched",
  });

  const onSubmit = (data: CvData["references"][0]) => {
    dispatch(addReference(data));
    reset();
    setShow(false);
  };

  useEffect(() => {
    if (
      isAddingReferences === "yes" &&
      (referencesStoreData?.length <= 0 || referencesStoreData === undefined)
    ) {
      setShow(true);
    }
    if (isAddingReferences === "no" || referencesStoreData?.length > 0) {
      validateForm(true);
    } else {
      validateForm(false);
    }
  }, [isAddingReferences, referencesStoreData, validateForm]);

  const formFields = [
    {
      label: "Reference Full Name",
      placeholder: "e.g. John Doe",
      name: "referenceName",
      error: errors?.referenceName,
    },
    {
      label: "Reference Job Title",
      placeholder: "e.g. Product Manager",
      name: "referenceJobTitle",
      error: errors?.referenceJobTitle,
    },
    {
      label: "Reference Email",
      placeholder: "e.g. example@example.com",
      name: "referenceEmail",
      error: errors?.referenceEmail,
    },
    {
      label: "Reference Phone Number",
      placeholder: "e.g. +447012345678",
      name: "referencePhoneNumber",
      error: errors?.referencePhoneNumber,
    },
    {
      label: "Reference Employer",
      placeholder: "e.g. Example Ltd",
      name: "referenceCompanyName",
      error: errors?.referenceCompanyName,
    },
  ];

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading>Do you want to add any References?</CustomHeading>
      <CustomParagraph>
        Include optional references who can shine a spotlight on your skills and
        character. Whether it&apos;s a former boss, a trusted colleague, or an
        inspiring mentor, let their words amplify your professional story
      </CustomParagraph>

      <div className="flex items-center justify-center gap-20 p-8   mx-auto max-w-3xl pb-24">
        <CustomRadioButton
          name="ref-options"
          text="Yes"
          onChange={(value: string) => {
            setIsAddingReferences(value);
            setShow(true);
          }}
          defaultChecked={isAddingReferences === "yes"}
        />
        <CustomRadioButton
          name="ref-options"
          text="No"
          onChange={(value: string) => {
            setIsAddingReferences(value);
            setShow(false);
          }}
          defaultChecked={isAddingReferences === "no"}
        />
      </div>
      <motion.form
        className=" mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative"
        variants={toggleFormVariant}
        animate={show ? "open" : "closed"}
        style={{ overflow: "hidden" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-y-1 gap-x-4">
          {formFields.map((data, index) => (
            <InputRow
              key={index}
              {...data}
              {...register(data.name as keyof CvData["references"][0])}
            />
          ))}

          <div className=" w-full flex items-center gap-3">
            <CustomButton className=" bg-yaleBlue hover:bg-yaleBlue/90 text-white text-lg w-full p-3 ">
              Add Reference
            </CustomButton>
            {referencesStoreData?.length > 0 && (
              <CustomButton
                className=" bg-yaleBlue/60 hover:bg-yaleBlue/80 text-white text-lg w-full"
                onClick={() => setShow(false)}
                type="button"
              >
                Cancel
              </CustomButton>
            )}
          </div>
        </div>
      </motion.form>

      {referencesStoreData?.length > 0 && (
        <CustomListDiv>
          <div className="flex justify-between">
            <h3 className=" text-lg font-FannGrotesqueProMid">
              Reference summary
            </h3>
            {!show && (
              <CustomButton
                className="self-end px-4 py-2 hover:bg-azure/60"
                onClick={() => setShow(true)}
              >
                Add References
              </CustomButton>
            )}
          </div>
          <AddedReferenceList />
        </CustomListDiv>
      )}
    </CustomFormSection>
  );
};

export default ReferencesForm;
