"use client";

import { FormProps } from "@/utils/interface";
import React, { useEffect, useState } from "react";
import CustomHeading from "../ui/CustomHeading";
import CustomParagraph from "../ui/CustomParagraph";
import CustomFormSection from "../ui/CustomFormSection";
import HintIcon from "../icons/HintIcon";
import CustomRadioButton from "../ui/CustomRadioButton";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { setPhoto } from "@/features/cv/cvSlice";

const PhotoForm = ({ validateForm, formRef }: FormProps) => {
  const dispatch = useAppDispatch();
  const selectCvData = useAppSelector((state) => state.cv.photo);

  const [isAddingPhoto, setIsAddingPhoto] = useState<string | null>(
    selectCvData ? "yes" : null
  );
  const [image, setImage] = useState<string | undefined>(selectCvData);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isAddingPhoto === "no" || image) {
      validateForm(true);
    } else {
      validateForm(false);
    }
  }, [isAddingPhoto, validateForm, image]);

  const removeImage = () => {
    setImage(undefined);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setPhoto(image));
  };

  return (
    <CustomFormSection>
      <div className="absolute top-0 right-0 py-6 px-10 cursor-help">
        <HintIcon />
      </div>
      <CustomHeading>
        Do you want to add a Professional photo to your CV?
      </CustomHeading>
      <CustomParagraph>
        Consider adding a photo to your CV. It can create a more personal
        connection with potential employers and help your application stand out.
        While not required, including a photo can leave a lasting impression
      </CustomParagraph>

      <form
        className=" p-8 mt-4  mx-auto max-w-3xl pb-24"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-20">
          <CustomRadioButton
            name="photo-options"
            text="Yes"
            onChange={(value: string) => setIsAddingPhoto(value)}
            defaultChecked={isAddingPhoto === "yes"}
          />
          <CustomRadioButton
            name="photo-options"
            text="No"
            onChange={(value: string) => {
              setIsAddingPhoto(value);
              removeImage();
            }}
            defaultChecked={isAddingPhoto === "no"}
          />
        </div>
        <div
          className={`max-w-sm mx-auto bg-gray-50 rounded-lg shadow-md overflow-hidden items-center mt-6 font-FannGrotesqueProBook transition-all duration-500 ease-in-out ${
            isAddingPhoto === "yes" ? "opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="px-4 py-6 transition-all duration-500 ease-in-out">
            <div
              id="image-preview"
              className={`max-w-sm mb-4 bg-gray-100 rounded-md items-center mx-auto text-center cursor-pointer h-48 ${
                image ? " " : "border-dashed border-2 border-yaleBlue p-6 "
              }`}
            >
              {image ? (
                <div className=" mx-auto max-h-48 overflow-hidden relative">
                  <Image
                    src={image}
                    alt="User Photo Preview"
                    className="object-fit mx-auto "
                    width={200}
                    height={300}
                  />
                </div>
              ) : (
                <label htmlFor="upload" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-700 ">
                    Upload picture
                  </h5>
                  <p className="font-normal text-xs text-gray-400 md:px-6 font-FannGrotesqueProXLight">
                    Choose photo size should be less than{" "}
                    <b className="text-gray-600">4MB</b>
                  </p>
                  <p className="font-normal text-sm text-gray-400 md:px-6 font-FannGrotesqueProXLight">
                    and should be in <b className="text-gray-600">JPG, PNG</b>{" "}
                    format.
                  </p>
                  <span
                    id="filename"
                    className="text-gray-500 bg-gray-200 z-50"
                  ></span>
                </label>
              )}

              <input
                id="upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full">
                <label
                  htmlFor="upload"
                  className="w-full text-white bg-conflowerBlue hover:bg-yaleBlue focus:ring-4 focus:outline-none focus:ring-conflowerBlue/50 rounded-md px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                >
                  <span className="text-center ml-2 font-FannGrotesqueProMid text-lg ">
                    {image ? "Change Photo" : "Upload Photo"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </CustomFormSection>
  );
};

export default PhotoForm;
