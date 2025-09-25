"use client";
import React, { useState } from "react";
import BrandTable from "@/features/brand/component/Table";
import { Brand } from "../types";
import FilterSection from "./BrandFilter";

const BrandManage = ({ brands }: { brands: Brand[] }) => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowCalendar(false);
  };
  const handleChange = (label: string, selectedValue: string) => {
    const newSelectedValues = {
      ...selectedValues,
      [label]: selectedValue,
    };

    setSelectedValues(newSelectedValues);
  };
  const handleReset = () => {
    setShowCalendar(false);
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDateChange = (field: string, value: string) => {
    setDates((prevDates) => ({
      ...prevDates,
      [field]: value,
    }));
  };

  const toggleMenu = (index: number | null) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="">
      <FilterSection
        handleSubmit={handleSubmit}
        showCalendar={showCalendar}
        handleReset={handleReset}
        handleChange={handleChange}
        setShowCalendar={setShowCalendar}
        dates={dates}
        handleDateChange={handleDateChange}
      />

      <div className="pt-4">
        <BrandTable
          openModal={openModal}
          brands={brands}
          openMenu={openMenu}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          toggleMenu={toggleMenu}
        />
      </div>
    </div>
  );
};

export default BrandManage;
