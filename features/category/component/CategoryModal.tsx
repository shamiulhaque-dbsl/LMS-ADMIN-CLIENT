import React from "react";
import { CategoryModal as CategoryModalProps } from "../types";
import ProductForm from "./CategoryCreate";
import Modal from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/Button";

const CategoryModal: React.FC<CategoryModalProps> = ({
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
        <Modal className="h-[90%] md:h-[95%]">
          <Modal.Head>
            Add Category
            <Button
              onClick={() => setIsModalOpen(false)}
              className="text-lg bg-transparent hover:bg-transparent"
            >
              dsa
              {/* <IoMdClose className="text-gray-500 hover:text-gray-600 text-xl rounded-full" /> */}
            </Button>
          </Modal.Head>
          <Modal.Content>
            <ProductForm addButton={false} />
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

export default CategoryModal;
