"use client";

import { Modal } from "@/components/ui/modal/Modal";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import Text from "@/components/ui/Text";

interface LessonModalProps {
  onSave: (data: any) => void;
  sectionOptions: { id: string; title: string }[];
}

export function LessonModal({ onSave, sectionOptions }: LessonModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const [form, setForm] = useState({
    title: "",
    description: "",
    sectionId: "",
    contentType: "video",
    contentUrl: "",
    notes: "",
    duration: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    // onClose();
  };

  return (
    <Modal id="lesson-modal">
      <ModalOverlay id="lesson-modal" />
      <ModalContent id="lesson-modal">
        <ModalClose id="lesson-modal" />
        <ModalHeader className="border-b">
          <ModalTitle>Add New Lesson</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              name="title"
              id="title"
              label="Title"
              placeholder="Lesson Title"
              value={form.title}
              required
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Textarea name="description" id="description" label="Description" />
            <div>
              <label className="label-base">
                Section<span className="required-star">*</span>
              </label>
              <select
                value={form.sectionId}
                onChange={(e) => handleChange("sectionId", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              >
                <option value="">Select Section</option>
                {sectionOptions.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.title}
                  </option>
                ))}
              </select>
            </div>
            {/* 
              TODO:
              - Content type wise content url input need to change
            */}
            <div>
              <label className="label-base" htmlFor="contenttype">
                Content Type<span className="required-star">*</span>
              </label>
              <select
                value={form.contentType}
                onChange={(e) => handleChange("contentType", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              >
                <option value="video">Video</option>
                <option value="text">Text</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <Input
              id="content_url"
              name="content_url"
              label="Content URL"
              placeholder="Content URL"
              value={form.contentUrl}
              onChange={(e) => handleChange("contentUrl", e.target.value)}
            />
            <Textarea
              id="notes"
              name="notes"
              label="Notes"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
            <Input
              id="duration"
              name="duration"
              label="Duration"
              placeholder="Duration (e.g., 5:30)"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />

            <div className="flex flex-col gap-2 text-sm">
              <Text as="span">Do you want to keep it free as a preview lesson?</Text>
              <label htmlFor="isPreview">
                <input type="checkbox" name="idPreview" id="isPreview" /> Mark as free lesson
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="border-t">
          <button
            onClick={() => closeModal("lesson-modal")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle confirm action
              console.log("Confirmed!");
              closeModal("lesson-modal");
            }}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Add Lesson
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
