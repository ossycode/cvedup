import React from "react";
import type { SVGProps } from "react";

const DragAndDropIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
      className="cursor-move"
    >
      <path
        fill="currentColor"
        d="M5 3H3v2h2zm14 4h2v6h-2V9H9v10h4v2H7V7zM7 3h2v2H7zM5 7H3v2h2zm-2 4h2v2H3zm2 4H3v2h2zm6-12h2v2h-2zm6 0h-2v2h2zm-2 14v-2h6v2h-2v2h-2v2h-2zm4 2v2h2v-2z"
      ></path>
    </svg>
  );
};

export default DragAndDropIcon;
