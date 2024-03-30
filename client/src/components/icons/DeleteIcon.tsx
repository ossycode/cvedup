import React from "react";
import type { SVGProps } from "react";

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none" strokeLinejoin="round" strokeWidth={4}>
        <path stroke="#000" strokeLinecap="round" d="M8 11L40 11"></path>
        <path stroke="#000" strokeLinecap="round" d="M18 5L30 5"></path>
        <path
          fill="#2f88ff"
          stroke="#000"
          d="M12 17H36V40C36 41.6569 34.6569 43 33 43H15C13.3431 43 12 41.6569 12 40V17Z"
        ></path>
        <path stroke="#fff" strokeLinecap="round" d="M20 25L28 33"></path>
        <path stroke="#fff" strokeLinecap="round" d="M28 25L20 33"></path>
      </g>
    </svg>
  );
};

export default DeleteIcon;
