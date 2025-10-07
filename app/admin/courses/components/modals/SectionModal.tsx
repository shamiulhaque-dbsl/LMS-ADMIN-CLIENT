"use client";

import { useModalStore } from "@/stores/modal-store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalClose,
  ModalBody,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";

interface SectionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; status: string }) => void;
}

export function SectionModal() {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Modal id="section-modal">
      <ModalOverlay id="section-modal" />
      <ModalContent id="section-modal">
        <ModalClose id="section-modal" />
        <ModalHeader className="border-b">
          <ModalTitle>Add new section</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input label="Title" id="title" name="title" placeholder="Content URL" required />
            <Textarea label="Description" />
            <div>
              <label className="label-base">Status</label>
              <select value="video" className="input-base" required>
                <option value="video">Video</option>
                <option value="text">Text</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => closeModal("section-modal")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeModal("section-modal");
            }}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
