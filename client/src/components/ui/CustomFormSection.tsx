import React, { ReactNode } from "react";

interface CustomFormSectionProps {
  children: ReactNode;
  className?: string;
}

const CustomFormSection: React.FC<CustomFormSectionProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={`h-full flex-grow p-8 w-full pb-28 relative ${className}`}
    >
      {children}
    </section>
  );
};

export default CustomFormSection;
