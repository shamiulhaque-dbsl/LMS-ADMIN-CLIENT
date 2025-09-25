import { cn } from "@/lib/utils/tailwind-utils";
import React from "react";
// import { Calendar as CalendarProps } from "../types";
export interface CalendarProps {
  onDateChange: (field: string, value: string) => void;
  dates: { [key: string]: string };
  label: string;
  field: string;
  labelClassName?: string;
  inputClassName?: string;
  className?: string;
}
const Calendar: React.FC<CalendarProps> = ({
  onDateChange,
  dates,
  label,
  field,
  labelClassName = "",
  inputClassName = "",
  className = "",
}) => {
  return (
    <div className={` ${className}`}>
      <label className={cn("block  mt-2", labelClassName)}>{label}</label>
      <input
        type="date"
        value={dates[field]}
        onChange={(e) => onDateChange(field, e.target.value)}
        className={cn(
          " p-2 w-full  border-none outline-none focus:ring-2 focus:border-transparent focus:outline-none",
          inputClassName
        )}
      />
    </div>
  );
};

export default Calendar;
