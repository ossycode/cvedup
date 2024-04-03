"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import { FormProps } from "@/utils/interface";
import CancelIcon from "../icons/RemoveIcon";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CustomButton from "../ui/CustomButton";
import DragAndDropIcon from "../icons/DragAndDropIcon";
import { getItemStyle } from "@/utils/dragableItemHelpers";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { addSkill, removeSkill } from "@/features/cv/cvSlice";

const SkillsForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const skillsStoreData = useAppSelector((state) => state.cv.skills);

  const [skills, setSkills] = useState<string[]>(skillsStoreData || []);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const addSkillRef = useRef<HTMLInputElement>(null);

  const handleAddSkill = () => {
    const newSkill = addSkillRef.current?.value.trim();
    if (newSkill) {
      setSkills([...skills, newSkill]);
      addSkillRef.current!.value = "";
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSkills(items);
  };

  const handleBlur = () => {
    if (skills?.length < 4 && !addSkillRef.current?.value.trim()) {
      setFormError("At least 4 skills are required");
    } else {
      setFormError(undefined);
    }
  };

  const handleDeleteDuty = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  useEffect(() => {
    if (skills.length >= 4) {
      validateForm(true);
    } else {
      validateForm(false);
    }
  }, [validateForm, skills?.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addSkill(skills));
  };

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

      <form
        className="mt-4 items-center gap-x-6 gap-y-4 mx-auto max-w-3xl pt-5 pb-12 relative"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="font-lg font-FannGrotesqueProMid text-gray-900">
          Highlight relevant skills for the job you want
        </h2>

        <div className="w-full grid grid-cols-[60%_auto] bg-gray-200 min-h-60 h-full rounded-md my-4 ">
          <div className=" p-3">
            <h2 className="text-xs font-FannGrotesquePro mb-1">
              Add four to eight skills
            </h2>
            <div className="flex items-start gap-1 mb-4">
              <label htmlFor={`add-skill`} className="flex-grow ">
                <input
                  type="text"
                  id={`add-skill`}
                  placeholder={`${
                    skillsStoreData?.length === undefined
                      ? "Type in a skill"
                      : `Add more skill`
                  }`}
                  onBlur={handleBlur}
                  ref={addSkillRef}
                  // onFocus={(e) => (e.target.dataset.touched = "true")}
                  className="w-full text-sm font-FannGrotesqueProBook px-2 py-3 bg-stone-100 border  outline-none focus:border-stone-500 focus:ring-stone-500"
                />
                <span
                  className={`text-red-500 mt-1 text-xs block transition-all duration-300 ease-in-out shrink-0 max-h-8  ${
                    formError ? "opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {formError}
                </span>
              </label>

              <CustomButton
                type="button"
                onClick={handleAddSkill}
                className="bg-yaleBlue hover:bg-yaleBlue/90 text-white rounded-none py-3 font-FannGrotesqueProBook"
              >
                Add
              </CustomButton>
            </div>

            {skills?.length > 0 && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="skills">
                  {(provided, snapshot) => (
                    <div
                      className=" bg-gray-50 rounded-md"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {skills?.map((skill: string, index: number) => (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="flex items-center justify-center   gap-1 w-full bg-stone-200 "
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={getItemStyle(
                              //   snapshot.isDragging,
                              //   provided.draggableProps.style
                              // )}
                            >
                              <DragAndDropIcon />
                              <label
                                htmlFor={`skill-${index}`}
                                className="flex-grow "
                              >
                                <input
                                  type="text"
                                  id={`skill-${index}`}
                                  value={skill}
                                  disabled
                                  className="w-full text-sm font-FannGrotesqueProBook px-1 py-2 bg-stone-100 border  outline-none focus:border-stone-500 focus:ring-stone-500"
                                />
                              </label>

                              <button
                                type="button"
                                className={` hover:bg-stone-300 rounded-full p-1`}
                                onClick={() => handleDeleteDuty(index)}
                              >
                                <CancelIcon />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          <div className="bg-stone-300 w-full h-full p-4 ">
            <CustomButton
              className="text-xs py-3 px-3 border border-teal-500 bg-teal-500 hover:border-teal-400 hover:bg-teal-400 disabled:opacity-50 disabled:pointer-events-none text-slate-50 "
              type="button"
            >
              Generate pre-written examples for you?
            </CustomButton>
          </div>
        </div>
      </form>
    </CustomFormSection>
  );
};

export default SkillsForm;
