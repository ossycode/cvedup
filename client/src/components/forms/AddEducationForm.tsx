"use client";

import React, { useEffect, useState } from "react";
import InputRow from "../ui/RowInput";
import CustomDatePicker from "../ui/CustomDatePicker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CvData, educationObject } from "@/utils/validation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import CustomButton from "../ui/CustomButton";
import { Checkbox } from "../lib/CheckboxSetup";
import { addEducation } from "@/features/cv/cvSlice";
import { motion } from "framer-motion";

interface Props {
  toggleForm: (value: boolean) => void;
  isOpen?: boolean;
}
const AddEducationForm = ({ toggleForm, isOpen }: Props) => {
  const dispatch = useAppDispatch();
  const selectCvData = useAppSelector((state) => state.cv.education);

  const [educationsList, setEducationsList] = useState(selectCvData || []);
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

  useEffect(() => {
    setEducationsList(selectCvData || []);
  }, [selectCvData]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CvData["education"][0]>({
    resolver: zodResolver(educationObject),
    mode: "onTouched",
  });

  const onSubmit = (data: CvData["education"][0]) => {
    const { startDate, endDate, ...rest } = data;

    let serializedStartDate: string | undefined;
    if (startDate instanceof Date) {
      serializedStartDate = startDate.toISOString();
    } else {
      serializedStartDate = startDate;
    }

    let serializedEndDate: string | undefined;
    if (endDate instanceof Date) {
      serializedEndDate = endDate.toISOString();
    } else {
      serializedEndDate = endDate;
    }

    const serializedData = {
      ...rest,
      startDate: serializedStartDate,
      endDate: serializedEndDate,
    };

    dispatch(addEducation(serializedData));
    setEducationsList((prev) => [...prev, serializedData]);

    reset();
    setIsCurrentlyStudying(false);
    toggleForm(false);
  };

  const handleCheckboxChange = (value: boolean) => {
    setIsCurrentlyStudying(value);

    if (value) {
      setValue("endDate", "Current", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setValue("endDate", "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    trigger("endDate");
  };

  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.7,
      },
    },
  };

  const formFields = [
    {
      label: "Institution Name",
      placeholder: "e.g. University of London",
      name: "schoolName",
      error: errors?.schoolName,
    },
    {
      label: "City / Country",
      placeholder: "e.g. London, UK",
      name: "schoolLocation",
      error: errors?.schoolLocation,
    },
    {
      label: "Qualification",
      placeholder: "e.g. Bachelor of Science",
      name: "qualification",
      error: errors?.qualification,
    },
    {
      label: "Field of Study",
      placeholder: "e.g. Computer Science",
      name: "areaOfStudy",
      error: errors?.areaOfStudy,
    },
    {
      label: "Honours / Awards (optional)",
      placeholder: "e.g. Distinction, Honours",
      name: "honours",
      error: errors?.honours,
    },
  ];

  return (
    <motion.form
      className="  mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative"
      onSubmit={handleSubmit(onSubmit)}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      style={{ overflow: "hidden" }}
    >
      <h2 className="mb-6 font-FannGrotesqueProMid">
        Start with your most recent qualifications first and then proceed in
        reverse order
      </h2>
      <div className="grid grid-cols-2 gap-y-1 gap-x-4">
        {formFields.map((data, index) => (
          <InputRow
            key={index}
            {...data}
            {...register(data.name as keyof CvData["education"][0])}
          />
        ))}

        <div className="flex items-center gap-2">
          <Controller
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="Start Date"
                placeholderText="Pick a start date"
                error={errors?.startDate}
              />
            )}
            name="startDate"
            control={control}
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="End Date"
                placeholderText="Pick an end date"
                error={errors?.endDate}
                disabled={isCurrentlyStudying}
              />
            )}
            name="endDate"
            control={control}
            rules={{ required: true }}
            defaultValue=""
          />
        </div>
        <div className=" w-full flex items-center gap-3">
          <CustomButton className=" bg-yaleBlue hover:bg-yaleBlue/90 text-white text-lg w-full ">
            Add Education
          </CustomButton>
          {selectCvData?.length > 0 && (
            <CustomButton
              className=" bg-yaleBlue/60 hover:bg-yaleBlue/80 text-white text-lg w-full"
              onClick={() => toggleForm(false)}
              type="button"
            >
              Cancel
            </CustomButton>
          )}
        </div>
        {!educationsList ||
          (educationsList?.length === 0 && (
            <div className="flex items-start gap-3 font-FannGrotesqueProBook justify-end">
              <label
                htmlFor="currentlyStudying "
                className=" flex gap-3 items-center"
              >
                <Checkbox
                  id="currentlyStudying"
                  //   {...register("currentlyStudying")}
                  onCheckedChange={(value) =>
                    handleCheckboxChange(value as boolean)
                  }
                />
                Current
              </label>
            </div>
          ))}
      </div>
    </motion.form>
  );
};

export default AddEducationForm;
