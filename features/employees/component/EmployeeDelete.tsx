"use client";
import React, { useState } from "react";
import { EmployeeModal as EmployeeModalProps } from "../types";
import Modal from "@/components/ui/Modal";

const EmployeeDelete: React.FC<EmployeeModalProps> = ({
  handleClick,
  setIsDelete,
  modalRef,
  formData,
  handleInputChange,
  setIsModalOpen,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
    if (setIsDelete) {
      setIsDelete(false);
    }
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={handleOverlayClick}
        >
          <Modal className="max-w-md ">
            <div onClick={handleModalClick} className="relative p-5 py-6 mt-2">
              <Modal.Content className="py-0">
                <button
                  onClick={() => setIsDelete?.(false)}
                  className="absolute top-2 right-9   text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:text-white"
                >
                  ✖
                </button>
                <div className="text-center ">
                  <svg
                    className="w-11 h-11 mx-auto text-gray-400 dark:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="mt-4 mb-4 text-gray-500 dark:text-black">
                    Are you sure you want to delete this item?
                  </p>
                </div>
              </Modal.Content>
              <Modal.Footer className=" mt-0 py-0 justify-center">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsDelete?.(false)}
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    No, cancel
                  </button>
                  <button className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Yes, I'm sure
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default EmployeeDelete;
