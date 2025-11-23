"use client";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "@/components/ui/modal";
import { useModalStore } from "@/stores/modal-store";
import { ModuleForm } from "../ModuleForm";

const MODAL_ID = "section-modal";

export function SectionModal() {
  const { payloads } = useModalStore();

  const section = payloads[MODAL_ID]?.section;
  const mode: "create" | "edit" = section ? "edit" : "create";

  return (
    <Modal id={MODAL_ID}>
      <ModalOverlay id={MODAL_ID} />
      <ModalContent id={MODAL_ID}>
        <ModalClose id={MODAL_ID} />
        <ModalHeader className="border-b">
          <ModalTitle>{mode === "edit" ? "Edit Section" : "Add Section"}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <ModuleForm section={section} mode={mode} />
        </ModalBody>

        {/* <ModalFooter>
          <Button type="button" size="sm" variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button size="sm" variant="default" onClick={handleSubmit(onSubmit)}>
            {mode === "edit" ? "Save Changes" : "Add Section"}
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
