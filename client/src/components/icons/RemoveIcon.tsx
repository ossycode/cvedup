import React from "react";
import type { SVGProps } from "react";

const CancelIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 2048 2048"
      {...props}
    >
      <path
        fill="currentColor"
        d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z"
      ></path>
    </svg>
  );
};

export default CancelIcon;
