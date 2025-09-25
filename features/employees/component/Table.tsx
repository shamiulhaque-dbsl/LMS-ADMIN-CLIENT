"use client";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaCircle } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import profile from "@/public/images/profile.jpg";
import { IoCheckboxOutline } from "react-icons/io5";

import { UserTable as UserTableProps } from "../types";
import EmployeeModal from "./EmployeeModal";
import Pagination from "./Pagination";
import EmployeeDelete from "./EmployeeDelete";

const UserTable: React.FC<UserTableProps> = ({
  openModal,
  employees,
  openMenu,
  isModalOpen,
  setIsModalOpen,
  toggleMenu,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    role: "",
    status: "",
    email: "",
    active: "",
    country: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(5);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const itemsPerPage = rows;
  const currentData = employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const filteredData = currentData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxClick = (index: number) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {};
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleMenu(null);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false); // Close modal
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleMenu, isModalOpen]);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 md:flex gap-2 justify-between mb-4 mt-2">
        <input
          type="text"
          placeholder="Search employees..."
          className="px-4 py-2 bg-[#f3f5f7] rounded-lg border border-gray-400 w-full sm:w-auto text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none "
        />
        <Button
          onClick={openModal}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 text-sm md:text-md gap-3"
        >
          <FaPlus /> Add
        </Button>
      </div>

      <div className="">
        <Table className="bg-white overflow-y-clip">
          <TableHeader className="bg-[#f9fafb] text-black border-0 ">
            <TableRow>
              <TableHead className=" font-extrabold border-0 text-xl">
                <MdOutlineCheckBoxOutlineBlank />
              </TableHead>
              <TableHead className=" font-extrabold border-0"> User</TableHead>
              <TableHead className=" font-extrabold border-0">User Role</TableHead>
              <TableHead className=" font-extrabold border-0">Email</TableHead>
              <TableHead className=" font-extrabold border-0">Country</TableHead>
              <TableHead className=" font-extrabold border-0">Status</TableHead>
              <TableHead className=" font-extrabold border-0">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white text-black ">
            {filteredData.map((employee, index) => (
              <TableRow key={index} className=" border-b-gray-100 hover:bg-gray-200 bg-white ">
                <TableCell className="border-0">
                  <div onClick={() => handleCheckboxClick(employee.id)} className="text-xl ">
                    {selectedCheckboxes.includes(employee.id) ? (
                      <IoCheckboxOutline className="bg-blue-600 text-white text-xl p-[2px] rounded-md" />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank className="text-xl" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2 min-w-max border-0">
                  <Image src={profile} alt="user" width={25} height={25} className="rounded-full" />
                  {employee.name}
                </TableCell>
                <TableCell className="border-0 ">{employee.role}</TableCell>
                <TableCell className="border-0">{employee.email}</TableCell>
                <TableCell className="border-0">{employee?.country}</TableCell>
                <TableCell className="border-0">
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className={`${
                        employee.status.toLowerCase() === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                    {employee.status.charAt(0).toUpperCase() +
                      employee.status.slice(1).toLowerCase()}
                  </div>
                </TableCell>
                <TableCell className="relative">
                  {/* toggleMenu */}
                  <button onClick={() => toggleMenu(index)}>...</button>
                  {openMenu === index && (
                    <div
                      ref={dropdownRef}
                      className="absolute mx-auto mt-2 w-32 bg-white shadow-lg  rounded-md text-black right-0 bottom-0  "
                    >
                      <button
                        className="w-full px-4 py-2 text-left flex items-center gap-2"
                        onClick={openModal}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button className="w-full px-4 py-2 text-left flex items-center gap-2">
                        <MdTipsAndUpdates /> Update
                      </button>
                      <button
                        className="w-full px-4 py-1 text-left flex items-center gap-2 text-red-600 "
                        onClick={() => setIsDelete(true)}
                      >
                        <RiDeleteBin5Fill />
                        Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="border-t-gray-200 text-black  ">
            <TableRow className=" bg-white"></TableRow>
          </TableFooter>
        </Table>
      </div>

      {isModalOpen && (
        <EmployeeModal
          handleClick={handleClick}
          setIsModalOpen={setIsModalOpen}
          modalRef={modalRef}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {isDelete && (
        <EmployeeDelete
          handleClick={handleClick}
          setIsDelete={setIsDelete}
          setIsModalOpen={setIsModalOpen}
          modalRef={modalRef}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        setRows={setRows}
        rows={rows}
      />
    </div>
  );
};

export default UserTable;
