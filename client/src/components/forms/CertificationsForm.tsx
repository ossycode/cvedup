import React, { useCallback, useEffect, useState } from "react";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import CustomRadioButton from "../ui/CustomRadioButton";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { FormProps } from "@/utils/interface";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { certificationObject, CvData } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputRow from "../ui/RowInput";
import CustomDatePicker from "../ui/CustomDatePicker";
import CustomButton from "../ui/CustomButton";
import { AddCertification } from "@/features/cv/cvSlice";
import AddedCertificationList from "../ui/AddedCertificationList";
import CustomListDiv from "../ui/CustomListDiv";
import { toggleFormVariant } from "@/utils/constants";

const CertificationsForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const certificationsStoreData = useAppSelector(
    (state) => state.cv.certifications
  );

  const [isAddingCertification, setIsAddingCertification] = useState<
    string | null
  >(certificationsStoreData ? "yes" : null);
  const [show, setShow] = React.useState(false);

  const toggleForm = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [setShow]
  );

  useEffect(() => {
    if (
      isAddingCertification === "yes" &&
      (certificationsStoreData?.length <= 0 ||
        certificationsStoreData === undefined)
    ) {
      toggleForm(true);
    }

    if (isAddingCertification === "no" || certificationsStoreData?.length > 0) {
      validateForm(true);
    } else {
      validateForm(false);
    }
  }, [
    certificationsStoreData,
    certificationsStoreData?.length,
    isAddingCertification,
    toggleForm,
    validateForm,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CvData["certifications"][0]>({
    resolver: zodResolver(certificationObject),
    mode: "onTouched",
  });

  const formFields = [
    {
      label: "Certification Name",
      placeholder: "e.g. AWS Developer Associate",
      name: "certName",
      error: errors?.certName,
    },
    {
      label: "Issuing Organization",
      placeholder: "e.g. Amazon Web Services",
      name: "certIssueOrganisation",
      error: errors?.certIssueOrganisation,
    },
  ];

  const onSubmit = (data: CvData["certifications"][0]) => {
    const { certDate, ...rest } = data;

    let serializedCertDate: string | undefined;

    if (certDate instanceof Date) {
      serializedCertDate = certDate.toISOString();
    } else {
      serializedCertDate = certDate;
    }
    const serializedData = {
      ...rest,
      certDate: serializedCertDate,
    };

    dispatch(AddCertification(serializedData));
    reset();
    toggleForm(false);
  };

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading>
        Do you want to add any Professional Certifications?
      </CustomHeading>
      <CustomParagraph>
        List your certifications to showcase your expertise.
      </CustomParagraph>

      <div className="flex items-center justify-center gap-20 p-8   mx-auto max-w-3xl pb-24">
        <CustomRadioButton
          name="cert-options"
          text="Yes"
          onChange={(value: string) => {
            setIsAddingCertification(value);
            setShow(true);
          }}
          defaultChecked={isAddingCertification === "yes"}
        />
        <CustomRadioButton
          name="cert-options"
          text="No"
          onChange={(value: string) => {
            setIsAddingCertification(value);
            setShow(false);
          }}
          defaultChecked={isAddingCertification === "no"}
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
              {...register(data.name as keyof CvData["certifications"][0])}
            />
          ))}
          <Controller
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="Certification Date"
                placeholderText="Pick a certification Date"
                error={errors?.certDate}
              />
            )}
            name="certDate"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
          />
          <div className=" w-full flex items-center gap-3">
            <CustomButton className=" bg-yaleBlue hover:bg-yaleBlue/90 text-white text-lg w-full ">
              Add Certification
            </CustomButton>
            {certificationsStoreData?.length > 0 && (
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

      {certificationsStoreData?.length > 0 && (
        <CustomListDiv>
          <div className="flex justify-between">
            <h3 className=" text-lg font-FannGrotesqueProMid">
              Certifications summary
            </h3>
            {!show && (
              <CustomButton
                className="self-end px-4 py-2 hover:bg-azure/60"
                onClick={() => setShow(true)}
              >
                Add More
              </CustomButton>
            )}
          </div>
          <AddedCertificationList toggleForm={toggleForm} />
        </CustomListDiv>
      )}
    </CustomFormSection>
  );
};

export default CertificationsForm;
