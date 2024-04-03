"use client";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { format } from "date-fns";
import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteCertification } from "@/features/cv/cvSlice";

const AddedCertificationList = ({
  toggleForm,
}: {
  toggleForm: (value: boolean) => void;
}) => {
  const certificationsStoreData = useAppSelector(
    (state) => state.cv.certifications
  );
  const dispatch = useAppDispatch();

  //   const handleDelete = (index: number) => {
  //     dispatch(deleteEducation(index));
  //   };

  return (
    <div className="flex flex-col gap-3 ">
      {certificationsStoreData?.map((cert, index) => (
        <div
          key={index}
          className="bg-blue-100 py-4 px-12 relative rounded-md flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div>
            <div className="absolute top-0 left-0 p-2 bg-blue-300 rounded-tl-md rounded-br-md	text-sm">
              {index + 1}
            </div>
            <h3 className="text-base font-FannGrotesqueProMid">
              {cert.certName},
              <span className="pl-2">{cert.certIssueOrganisation}</span>
            </h3>
            <p className="text-sm  font-FannGrotesqueProBookItalic">
              {format(new Date(cert.certDate), "MM/yyyy")}
            </p>
          </div>

          <button
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
            onClick={() => dispatch(deleteCertification(index))}
            type="button"
          >
            <DeleteIcon className="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddedCertificationList;
