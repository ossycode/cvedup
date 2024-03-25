import React from "react";

interface CustomRadioButtonProps {
  text: string;
  name: string;
  className?: string;
  onChange: (value: string) => void;
  defaultChecked?: boolean;
}

const CustomRadioButton = ({
  text,
  name,
  className,
  onChange,
  defaultChecked,
}: CustomRadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label>
      <input
        type="radio"
        className="peer hidden"
        name={name}
        onChange={handleChange}
        value={text.toLowerCase()}
        defaultChecked={defaultChecked}
      />

      <div className="hover:bg-gray-50 flex items-center justify-between gap-6 px-4 py-2 border-2 cursor-pointer  border-gray-200 group peer-checked:border-conflowerBlue rounded-2xl text-lg transition-all duration-500 ease-in-out">
        <h2 className="font-FannGrotesqueProMid text-gray-900">{text}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-conflowerBlue hidden group-[.peer:checked+&]:inline transition-all duration-500 ease-in-out"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </label>
  );
};

export default CustomRadioButton;
