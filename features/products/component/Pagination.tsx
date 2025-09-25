"use client";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/Button";
import SelectButton from "./SelectButton";
import { Pagination as PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setRows,
  rows,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationRange = () => {
    let range = [];
    return (range = [1, 2, 3, "...", totalPages]);
  };

  const handleChange = (label: string, selectedValue: string) => {};

  return (
    <div className="flex flex-wrap items-center justify-between py-4 space-y-3 sm:space-y-0 text-sm md:text-md">
      <div className="text-black flex items-center justify-center gap-3 w-full sm:w-auto">
        <SelectButton
          title="Rows per page"
          label="per page"
          value={["5", "15", "20"]}
          onSelect={handleChange}
          className="flex items-center gap-1 "
          selectClassName="text-black py-2 px-4 bg-[#f9fafb] w-fit border border-gray-300 flex"
        />
        <p className="">{`${1}-${5} of ${7}`}</p>
      </div>

      <div className="flex items-center w-full sm:w-auto justify-center  text-black">
        <Button
          className={`py-[9px] border border-black bg-transparent  rounded-none focus:ring-0 focus:ring-offset-0 `}
          size="sm"
          variant="ghost"
        >
          <IoIosArrowBack className="" />
        </Button>
        <div className="flex">
          {getPaginationRange().map((page, index) => (
            <Button
              key={index}
              className={`border border-black rounded-none text-sm  focus:ring-0 focus:ring-offset-0
               `}
              size="sm"
              variant="ghost"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          className={`py-[9px] border border-black rounded-none focus:ring-0 focus:ring-offset-0
            `}
          size="sm"
          variant="outline"
        >
          <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
