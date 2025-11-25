"use client";

import { Modal } from "@/components/ui/modal/Modal";
import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalClose,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/ui/modal";
import { useModalStore } from "@/stores/modal-store";
import { ModalCloseButton } from "@/components/ui/modal/ModalCloseButton";
import { LessonForm } from "../LessonForm";

const MODAL_ID = "lesson-modal";

export function LessonModal() {
  const { payloads } = useModalStore();

  const moduleId = payloads[MODAL_ID]?.moduleId;
  const lesson = payloads[MODAL_ID]?.lesson;
  const mode: "create" | "edit" = lesson ? "edit" : "create";

  return (
    <Modal id={MODAL_ID}>
      <ModalOverlay id={MODAL_ID} />
      <ModalContent id={MODAL_ID}>
        <ModalClose id={MODAL_ID} />
        <ModalHeader className="border-b">
          <ModalTitle>{mode === "edit" ? "Edit Lesson" : "Add Lesson"}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <LessonForm moduleId={moduleId} lesson={lesson} mode={mode} />
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton id={MODAL_ID} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
