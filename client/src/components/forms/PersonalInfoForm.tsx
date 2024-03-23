import React, { useEffect, useState } from "react";
import CustomParagraph from "../ui/CustomParagraph";
import CustomHeading from "../ui/CustomHeading";
import InputRow from "../ui/RowInput";
import SelectCountry from "../ui/SelectCoutry";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CvData, cvDataSchema } from "@/utils/validation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { setPersonalInformation } from "@/features/cv/cvSlice";

interface Props {
  validateForm: (value: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

const PersonalInfoForm = ({ validateForm, formRef }: Props) => {
  const dispatch = useAppDispatch();
  const selectCvData = useAppSelector((state) => state.cv.personalInformation);

  const personalInfoSchema = cvDataSchema.shape.personalInformation;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CvData["personalInformation"]>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: selectCvData?.firstName,
      lastName: selectCvData?.lastName,
      phoneNumber: selectCvData?.phoneNumber,
      email: selectCvData?.email,
      address: {
        country: selectCvData?.address?.country,
        city: selectCvData?.address?.city,
        postCode: selectCvData?.address?.postCode,
        state: selectCvData?.address?.state,
        street: selectCvData?.address?.street,
      },
    },
  });

  const watchedFields = watch();

  const handleValueChange = (value: string, name: string) => {
    setValue(name as keyof CvData["personalInformation"], value);
  };

  useEffect(() => {
    validateForm(isValid);

    // console.log(watchedFields);
  }, [isValid, validateForm, watchedFields]);

  const formData = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
      error: errors?.firstName,
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      error: errors?.lastName,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      error: errors?.email,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter your phone number",
      type: "tel",
      error: errors?.phoneNumber,
    },
    {
      label: "Street",
      name: "address.street",
      placeholder: "Enter your street address",
      error: errors?.address?.street,
    },
    {
      label: "State / County",
      name: "address.state",
      placeholder: "Enter your state / county",
      error: errors?.address?.state,
    },
    {
      label: "City",
      name: "address.city",
      placeholder: "Enter your city",
      error: errors?.address?.city,
    },
    {
      label: "Post / Zip Code",
      name: "address.postCode",
      placeholder: "Enter your post / zip code",
      error: errors?.address?.postCode,
    },
  ];

  const onSubmit = (data: CvData["personalInformation"]) => {
    console.log(data);
    // reset();
    dispatch(setPersonalInformation(data));
  };

  return (
    <section className="h-full flex-grow p-8 w-full pb-28">
      <CustomHeading> Tell Us About Yourself</CustomHeading>
      <CustomParagraph>
        {" "}
        Let&apos;s get started by creating your personalized CV. Enter your
        personal information below, and we&apos;ll craft a stunning CV tailored
        just for you!
      </CustomParagraph>

      <form
        className="grid grid-cols-2 p-8 mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pb-24 relative"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        ref={formRef}
      >
        {formData.map((data, index) => (
          <InputRow
            key={index}
            {...data}
            {...register(data.name as keyof CvData["personalInformation"])}
          />
        ))}
        <SelectCountry
          error={errors.address?.country}
          {...register("address.country")}
          onValueChange={(value) =>
            setValue("address.country", value, {
              shouldValidate: true,
            })
          }
          value={selectCvData?.address?.country}
        />
      </form>
    </section>
  );
};

export default PersonalInfoForm;
