import Step from "@/components/Step";
import React from "react";

const StepPage = ({ params }: { params: { step: string } }) => {
  // interface cvData {
  //   personalInformation: {
  //     firstName: string;
  //     lastName: string;
  //     phoneNumber: string;
  //     email: string;
  //     address: {
  //       street: string;
  //       city: string;
  //       state: string;
  //       postCode: string;
  //       country: string;
  //     };
  //   };
  //   education: {
  //     schoolName: string;
  //     areaOfStudy: string;
  //     qualification: string;
  //     startDate: string;
  //     endDate: string;
  //     honours?: string;
  //   }[];
  //   workExperience: {
  //     employerName: string;
  //     jobTitle: string;
  //     duties: string[];
  //     startDate: string;
  //     endDate: string;
  //   }[];
  //   references?: {
  //     referenceName: string;
  //     referenceJobTitle: string;
  //     referenceEmail: string;
  //     referencePhoneNumber: string;
  //   }[];
  //   photo?: string;
  //   language?: string[];
  //   summary: string;
  // }
  return <Step params={params} />;
};

export default StepPage;
