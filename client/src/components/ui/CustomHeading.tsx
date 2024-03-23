import React, { ReactNode } from "react";

interface CustomHeadingProps {
  children: ReactNode;
  className?: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={`text-2xl font-FannGrotesqueProSemiBold text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export default CustomHeading;
