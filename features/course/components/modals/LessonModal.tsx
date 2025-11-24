"use client";

import { Modal } from "@/components/ui/modal/Modal";
import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalClose,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useModalStore } from "@/stores/modal-store";
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
          <ModalTitle>Add New Lesson</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <LessonForm moduleId={moduleId} lesson={lesson} mode={mode} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
