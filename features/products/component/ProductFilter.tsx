import React from "react";
import { Button } from "@/components/ui/Button";
import SelectButton from "./SelectButton";
import { FilterEmployee as FilterEmployeeProps } from "../types";
import Calendar from "@/components/ui/Calendar";

const FilterSection: React.FC<FilterEmployeeProps> = ({
  handleSubmit,
  showCalendar,
  handleReset,
  handleChange,
  setShowCalendar,
  dates,
  handleDateChange,
}) => {
  const selectClassName = "text-black py-2 px-4 bg-[#f9fafb] border border-gray-300 w-full mt-2";
  const calendarInputClassName = "rounded-lg text-black bg-[#f9fafb] border border-gray-300";
  return (
    <div className="flex justify-center items-center text-sm md:text-md  font-medium lg:mt-1">
      <div className="relative w-full rounded-lg  text-black ">
        <div className="absolute bg-white -top-3 left-3 px-2 text-lg font-semibold flex items-center"></div>

        <form
          onSubmit={handleSubmit}
          className="py-2 mt-3 md:mt-0 md:py-4 px-3 rounded-lg shadow-lg shadow-gray-400 "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
            <SelectButton
              title="Product Name"
              label="product"
              value={["Realme 14 Pro 5G", "Samsung Galaxy S25", "Oppo Reno 13"]}
              onSelect={handleChange}
              selectClassName={selectClassName}
            />
            <SelectButton
              title="Brand Name"
              label="brand"
              value={["Oppo", "Realme", "Samsung"]}
              onSelect={handleChange}
              selectClassName={selectClassName}
            />
            <SelectButton
              title="Product State"
              label="state"
              value={["New", "Refurbished"]}
              onSelect={handleChange}
              selectClassName={selectClassName}
            />
          </div>

          <br />
          <div className="grid grid-cols-1 md:flex gap-4">
            <Button
              onClick={() => setShowCalendar(!showCalendar)}
              type="button"
              className="rounded-lg w-fit"
            >
              {/* <FaRegCalendarAlt /> */}
              ds{" "}
            </Button>
            <div className=" flex gap-4 ">
              <Button type="submit" className="rounded-lg w-full md:w-fit md:h-fit">
                Submit
              </Button>
              <Button
                onClick={() => handleReset()}
                type="reset"
                className="rounded-lg w-full md:w-fit md:h-fit"
              >
                Reset
              </Button>
            </div>
          </div>

          {showCalendar && (
            <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
              <Calendar
                label="Start Date"
                field="startDate"
                dates={dates}
                onDateChange={handleDateChange}
                labelClassName="text-black"
                inputClassName={calendarInputClassName}
                className="w-full md:w-6/12  "
              />
              <Calendar
                label="End Date"
                field="endDate"
                dates={dates}
                onDateChange={handleDateChange}
                labelClassName="text-black"
                inputClassName={calendarInputClassName}
                className="w-full md:w-6/12  "
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FilterSection;
