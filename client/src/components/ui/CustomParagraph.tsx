import React, { ReactNode } from "react";

interface CustomParagraphProps {
  children: ReactNode;
  className?: string;
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({
  children,
  className,
}) => {
  return (
    <p
      className={`mt-6 text-center text-sm max-w-2xl mx-auto font-FannGrotesqueProBook ${className}`}
    >
      {children}
    </p>
  );
};

export default CustomParagraph;
