import React from "react";
import { EmployeeModal as EmployeeModalProps } from "../types";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { IoMdClose } from "react-icons/io";
import EmployeeForm from "./EmployeeCreate";

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  handleClick,
  setIsModalOpen,
  modalRef,
  formData,
  handleInputChange,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      <div
        ref={modalRef}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 "
        onClick={handleOverlayClick}
      >
        <Modal className="lg:w-6/12 md:h-[75%]">
          <Modal.Head>
            Add Employee
            <Button
              onClick={() => setIsModalOpen(false)}
              className="text-lg bg-transparent hover:bg-transparent"
            >
              <IoMdClose className="text-gray-500 hover:text-gray-600 text-xl rounded-full" />
            </Button>
          </Modal.Head>
          <Modal.Content>
            <EmployeeForm
              addButton={false}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-400">
              Cancel
            </Button>
            <Button onClick={handleClick}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeModal;
