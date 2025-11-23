"use client";

import { useEffect } from "react";
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
import { useModalStore } from "@/stores/modal-store";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { useFormContext } from "react-hook-form";

const MODAL_ID = "section-modal";

interface SectionModalProps {
  mode?: "create" | "edit";
  section?: {
    id?: string | number;
    title: string;
    description?: string;
    status?: string;
  };
  onSave?: (data: {
    id?: string | number;
    title: string;
    description?: string;
    status?: string;
  }) => void;
}

export function SectionModal({ onSave }: SectionModalProps) {
  const { closeModal, payloads } = useModalStore();
  const sectionStatus = useCourseFormStore((s) => s.courseMetadata?.moduleStatus ?? []);

  const section = payloads[MODAL_ID]?.section;
  const mode = section ? "edit" : "create";

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue("title", section?.title || "");
    setValue("description", section?.description || "");
    setValue("status", section?.status || "");
  }, [section, setValue]);

  const handleClose = () => closeModal(MODAL_ID);

  const handleSubmit = () => {
    let data: { title: string; description?: string; status?: string };
    data = {
      title: section?.title || getValues("title"),
      description: section?.description || getValues("description"),
      status: section?.status || getValues("status"),
    };

    if (!data.title?.trim()) return;

    onSave?.({
      id: section?.id,
      title: data.title.trim(),
      description: data.description?.trim(),
      status: data.status,
    });

    handleClose();
  };

  return (
    <Modal id={MODAL_ID}>
      <ModalOverlay id={MODAL_ID} />
      <ModalContent id={MODAL_ID}>
        <ModalClose id={MODAL_ID} />
        <ModalHeader className="border-b">
          <ModalTitle>{mode === "edit" ? "Edit Section" : "Add Section"}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input label="Title" id="title" required {...register("title")} />

            <Textarea label="Description" id="description" {...register("description")} />

            <div>
              <label className="label-base">Status</label>
              <select className="input-base" id="status" {...register("status")}>
                {sectionStatus.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn-cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            {mode === "edit" ? "Save Changes" : "Add Section"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
