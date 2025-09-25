import { cn } from "@/lib/utils/tailwind-utils";
import React from "react";
import { SelectButton as SelectButtonProps } from "../types";

const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  value,
  onSelect,
  className = "",
  selectClassName = "",
  title = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(label, event.target.value);
  };

  return (
    <div className={`${className}`}>
      <label className="text-black">{title}</label>
      <br />
      <select
        onChange={handleChange}
        className={cn(
          "rounded-md  outline-none focus:ring-2 focus:border-transparent focus:outline-none  px-4 py-[10px] mt-1 bg-[#f3f5f5]/20  w-full  text-black  border border-gray-300",
          selectClassName
        )}
      >
        {value?.map((param, idx) => (
          <option key={idx} value={param}>
            {param}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectButton;
