"use client";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { format } from "date-fns";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteEducation } from "@/features/cv/cvSlice";

const AddedEducationList = () => {
  const selectCvData = useAppSelector((state) => state.cv.education);
  const dispatch = useAppDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteEducation(index));
  };

  return (
    <div className="flex flex-col gap-3 ">
      {selectCvData?.map((education, index) => (
        <div
          key={index}
          className="bg-blue-100 py-4 px-12 relative rounded-md flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div>
            <div className="absolute top-0 left-0 p-2 bg-blue-300 rounded-tl-md rounded-br-md	text-sm">
              {index + 1}
            </div>
            <h3 className="text-base font-FannGrotesqueProMid">
              {education.qualification},
              <span className="pl-2">{education.areaOfStudy}</span>
            </h3>
            <div className="flex items-center text-sm">
              <p className="pr-1">{education.schoolName},</p>{" "}
              <p className="pl-1">{education.schoolLocation}</p>
              {education.honours && (
                <p>
                  <span className="px-1">|</span>
                  {education.honours}
                </p>
              )}
              <p>
                <span className="px-1">|</span>
                {format(new Date(education.startDate), "MM/yyyy")} -{" "}
                {typeof education.endDate === "string" &&
                education.endDate.toLowerCase() === "current"
                  ? education.endDate
                  : format(new Date(education.endDate), "MM/yyyy")}
              </p>
            </div>
          </div>

          <button
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
            onClick={() => handleDelete(index)}
          >
            <DeleteIcon className="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddedEducationList;
