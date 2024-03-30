import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/AccordionSetup";
import CustomButton from "./CustomButton";

interface AccordionFormProps {
  header: string;
  children: React.ReactNode;
  isOpen: boolean;
  length: number;
  //   onToggle: (open: boolean) => void;
}
const AccordionForm = ({
  header,
  children,
  //   onToggle,
  isOpen,
  length,
}: AccordionFormProps) => {
  const [value, setValue] = React.useState<string | undefined>("one");

  React.useEffect(() => {
    setValue(isOpen ? "one" : undefined);
  }, [isOpen]);

  return (
    <Accordion
      type="single"
      collapsible
      className="px-9 mt-5"
      //   defaultValue={isOpen ? "one" : undefined}
      value={value}
      onValueChange={setValue}
    >
      <AccordionItem value="one">
        <AccordionTrigger>
          <span
            className={`bg-yaleBlue text-white px-5 py-3 rounded-md shadow ${
              value === "one" ? "bg-gray-500" : "bg-gray-600"
            }`}
          >
            {value !== "one" && length > 1
              ? `Add More ${header} Details`
              : value === "one"
              ? `Close Add ${header} Form`
              : length < 1
              ? `Open Add ${header} Form`
              : `Add ${header} Details`}
          </span>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionForm;
