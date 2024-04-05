"use client";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteReference } from "@/features/cv/cvSlice";

const AddedReferenceList = ({}) => {
  const referencesStoreData = useAppSelector((state) => state.cv.references);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-3 font-FannGrotesqueProBook ">
      {referencesStoreData?.map((ref, index) => (
        <div
          key={index}
          className="bg-blue-100 py-4 px-12 relative rounded-md flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div>
            <div className="absolute top-0 left-0 p-2 bg-blue-300 rounded-tl-md rounded-br-md	text-sm">
              {index + 1}
            </div>
            <h3 className="text-base font-FannGrotesqueProMid">
              {ref.referenceName}
            </h3>
            <p>
              {ref.referenceJobTitle && <span>{ref?.referenceJobTitle}</span>}
              {ref.referenceCompanyName && (
                <span>, {ref?.referenceCompanyName}</span>
              )}
            </p>
            <p className="text-sm">{ref.referenceEmail}</p>
            <p className="text-sm">{ref.referencePhoneNumber}</p>
          </div>

          <button
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
            onClick={() => dispatch(deleteReference(index))}
            type="button"
          >
            <DeleteIcon className="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddedReferenceList;
