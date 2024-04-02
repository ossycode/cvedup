"use client";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { format } from "date-fns";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteEducation, deleteWorkExperience } from "@/features/cv/cvSlice";

const AddedWorkExperienceList = () => {
  const selectCvData = useAppSelector((state) => state.cv.workExperience);
  const dispatch = useAppDispatch();

  //   const handleDelete = (index: number) => {
  //     dispatch(deleteEducation(index));
  //   };

  return (
    <div className="flex flex-col gap-3 ">
      {selectCvData?.map((workExperience, index) => (
        <div
          key={index}
          className="bg-blue-100 py-4 px-12 relative rounded-md flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div>
            <div className="absolute top-0 left-0 p-2 bg-blue-300 rounded-tl-md rounded-br-md	text-sm">
              {index + 1}
            </div>
            <h3 className="text-base font-FannGrotesqueProMid">
              {workExperience.employerName},
              <span className="pl-2">{workExperience.jobTitle}</span>
            </h3>
            <p className="text-sm font-FannGrotesqueProBook">
              {format(new Date(workExperience.startDate), "MM/yyyy")} -{" "}
              {typeof workExperience.endDate === "string" &&
              workExperience.endDate.toLowerCase() === "current"
                ? workExperience.endDate
                : format(new Date(workExperience.endDate), "MM/yyyy")}
            </p>
            <ul className="list-disc list-inside text-sm font-FannGrotesqueProBookItalic ">
              {workExperience.duties?.map((duty, index) => (
                <li key={index} className="px-1">
                  {duty}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
            onClick={() => dispatch(deleteWorkExperience(index))}
            type="button"
          >
            <DeleteIcon className="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddedWorkExperienceList;
