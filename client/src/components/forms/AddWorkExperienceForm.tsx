"use client";

import React, { useEffect, useRef, useState } from "react";
import InputRow from "../ui/RowInput";
import CustomDatePicker from "../ui/CustomDatePicker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CvData, workExperienceObject } from "@/utils/validation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import CustomButton from "../ui/CustomButton";
import { Checkbox } from "../lib/CheckboxSetup";
import { addWorkExperience } from "@/features/cv/cvSlice";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CancelIcon from "../icons/RemoveIcon";
import DragAndDropIcon from "../icons/DragAndDropIcon";

interface Props {
  toggleForm: (value: boolean) => void;
  isOpen?: boolean;
}

interface Duty {
  id: string;
  text: string;
}
const AddWorkExperienceForm = ({ toggleForm, isOpen }: Props) => {
  const dispatch = useAppDispatch();

  const workExperiencesStore = useAppSelector(
    (state) => state.cv.workExperience
  );

  const [workExperiencesList, setWorkExperiencesList] = useState(
    workExperiencesStore || []
  );

  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [duties, setDuties] = useState<Duty[]>([{ id: "1", text: "" }]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(duties);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDuties(items);
  };

  useEffect(() => {
    setWorkExperiencesList(workExperiencesStore || []);
  }, [workExperiencesStore]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CvData["workExperience"][0]>({
    resolver: zodResolver(workExperienceObject),
    mode: "onTouched",
  });

  const { fields } = useFieldArray({
    name: `duties`,
    control,
  } as never);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedDuties = [...duties];
    updatedDuties[index].text =
      value.charAt(0).toUpperCase() + value.slice(1).replace(/\.$/, "");
    setDuties(updatedDuties);

    // Check if the input is empty and has been touched
    if (value.trim() === "" && e.target.dataset.touched === "true") {
      //   Remove the input and its associated label
      updatedDuties.splice(index, 1);
      setDuties(updatedDuties);
    }

    // Add a new input field if the current one is not the last one and has a value
    if (index === duties.length - 1 && value.trim() !== "") {
      const newDuty: Duty = { id: Date.now().toString(), text: "" };
      setDuties([...updatedDuties, newDuty]);
    }
  };

  const handleDeleteDuty = (index: number) => {
    if (duties.length === 1) {
      return;
    }
    const updatedDuties = [...duties];
    updatedDuties.splice(index, 1);
    setDuties(updatedDuties);
  };

  const onSubmit = (data: CvData["workExperience"][0]) => {
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

    dispatch(addWorkExperience(serializedData));
    setWorkExperiencesList((prev) => [...prev, serializedData]);
    console.log(serializedData);

    setIsCurrentlyWorking(false);
    reset();
    setDuties((prevDuties) => {
      const updatedDuties = prevDuties.map((duty, index) => {
        if (index === 0) {
          return { ...duty, text: "" };
        }
        return duty;
      });
      return [updatedDuties[0]];
    });
    toggleForm(false);
  };

  const handleCheckboxChange = (value: boolean) => {
    setIsCurrentlyWorking(value);

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
      label: "Employer Name",
      placeholder: "e.g. Google",
      name: "employerName",
      error: errors?.employerName,
    },
    {
      label: "Job Title",
      placeholder: "e.g. Software Engineer",
      name: "jobTitle",
      error: errors?.jobTitle,
    },
    // {
    //   label: "Location (optional)",
    //   placeholder: "e.g. London, United Kingdom",
    //   name: "location",
    //   error: errors?.location,
    // },
  ];

  const grid = 10;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid,
    background: isDragging && "gray",
    ...draggableStyle,
  });

  return (
    <motion.form
      className="  mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative"
      onSubmit={handleSubmit(onSubmit)}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      style={{ overflow: "hidden" }}
    >
      <h2 className="mb-6 font-FannGrotesqueProMid">
        Start with your most recent job and then proceed in reverse order
      </h2>
      <div className="grid grid-cols-2 gap-y-1 gap-x-4">
        {formFields.map((data, index) => (
          <InputRow
            key={index}
            {...data}
            {...register(data.name as keyof CvData["workExperience"][0])}
          />
        ))}

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
            <div>
              <CustomDatePicker
                {...field}
                label="End Date"
                placeholderText="Pick an end date"
                error={errors?.endDate}
                disabled={isCurrentlyWorking}
              />
              {!workExperiencesList ||
                (workExperiencesList?.length === 0 && (
                  <div className="flex items-start gap-3 font-FannGrotesqueProBook justify-start">
                    <label
                      htmlFor="currentlyWorking "
                      className=" flex gap-3 items-center"
                    >
                      <Checkbox
                        id="currentlyWorking"
                        onCheckedChange={(value) =>
                          handleCheckboxChange(value as boolean)
                        }
                      />
                      Current
                    </label>
                  </div>
                ))}
            </div>
          )}
          name="endDate"
          control={control}
          rules={{ required: true }}
          defaultValue=""
        />
      </div>

      <div className="flex flex-col items-center bg-gray-200 min-h-60 h-auto rounded-md my-4">
        <div className="grid grid-cols-[60% auto] flex-grow h-full w-full ">
          <div className="w-full h-full p-4 flex flex-col gap-3 ">
            <h2 className="text-sm font-FannGrotesquePro">
              List in your responsibilities, achievements and job details.
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="duties">
                {(provided, snapshot) => (
                  <div
                    className="flex flex-col gap-2 px-2 py-2 flex-grow bg-gray-50 rounded-md"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {duties?.map((duty, index) => (
                      <Controller
                        key={index}
                        name={`duties`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Draggable
                            key={duty.id}
                            draggableId={duty.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="flex items-center justify-center p-2  gap-1 w-full bg-stone-200 "
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <DragAndDropIcon />
                                <label
                                  htmlFor={`duty-${index}`}
                                  className="flex-grow "
                                >
                                  <input
                                    type="text"
                                    id={`duty-${index}`}
                                    value={duty.text}
                                    placeholder={`${
                                      index === 0
                                        ? "Type in a responsibility, achievement, or job detail"
                                        : `Add more responsibility, achievement, or job detail`
                                    }`}
                                    onChange={(e) => {
                                      setValue(
                                        `duties.${index}`,
                                        e.target.value,
                                        {
                                          shouldDirty: true,
                                          shouldTouch: true,
                                          shouldValidate: true,
                                        }
                                      );
                                      handleInputChange(e, index);
                                      trigger("duties");
                                    }}
                                    onFocus={(e) =>
                                      (e.target.dataset.touched = "true")
                                    }
                                    className="w-full text-sm font-FannGrotesqueProBook px-2 py-3 bg-stone-100 border  outline-none focus:border-stone-500 focus:ring-stone-500"
                                  />
                                </label>

                                <button
                                  type="button"
                                  className={`${
                                    index !== 0
                                      ? "opacity-100"
                                      : "opacity-0 invisible"
                                  } transition-all duration-200 hover:bg-stone-300 rounded-full p-1`}
                                  onClick={() => handleDeleteDuty(index)}
                                >
                                  <CancelIcon />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        )}
                      />
                    ))}
                    <span
                      className={`text-red-500 mt-1 text-xs block transition-all duration-300 ease-in-out shrink-0  ${
                        errors.duties ? "opacity-100" : "invisible opacity-0"
                      }`}
                    >
                      {errors?.duties?.message}
                    </span>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="bg-stone-300 w-full h-full p-4 ">
            <CustomButton
              className="text-sm py-3 px-4 inline-flex items-center gap-x-2 border border-teal-500 bg-teal-500 hover:border-teal-400 hover:bg-teal-400 disabled:opacity-50 disabled:pointer-events-none text-slate-50 "
              type="button"
            >
              Generate pre-written examples for you?
            </CustomButton>
          </div>
        </div>
      </div>

      <div className=" w-full flex items-center gap-3">
        <CustomButton className=" bg-yaleBlue hover:bg-yaleBlue/90 text-white text-lg w-full ">
          Add Job
        </CustomButton>
        {workExperiencesStore?.length > 0 && (
          <CustomButton
            className=" bg-yaleBlue/60 hover:bg-yaleBlue/80 text-white text-lg w-full"
            onClick={() => toggleForm(false)}
            type="button"
          >
            Cancel
          </CustomButton>
        )}
      </div>
    </motion.form>
  );
};

export default AddWorkExperienceForm;
