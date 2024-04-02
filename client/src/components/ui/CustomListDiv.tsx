import React, { ReactNode } from "react";

interface CustomListDivProps {
  children: ReactNode;
  className?: string;
}

const CustomListDiv: React.FC<CustomListDivProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-gray-100 p-4 flex flex-col gap-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] max-w-3xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomListDiv;
