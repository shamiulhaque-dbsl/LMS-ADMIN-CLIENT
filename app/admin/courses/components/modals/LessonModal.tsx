"use client";

import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface LessonModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  sectionOptions: { id: string; title: string }[];
}

export function LessonModal({ open, onClose, onSave, sectionOptions }: LessonModalProps) {
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
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Add / Edit Lesson" size="xl">
      <div className="space-y-3">
        <Input
          placeholder="Lesson Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          rows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
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
        <select
          value={form.contentType}
          onChange={(e) => handleChange("contentType", e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="video">Video</option>
          <option value="text">Text</option>
          <option value="pdf">PDF</option>
        </select>
        <Input
          placeholder="Content URL"
          value={form.contentUrl}
          onChange={(e) => handleChange("contentUrl", e.target.value)}
        />
        <Input
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
        <Input
          placeholder="Duration (e.g., 5:30)"
          value={form.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </div>
    </Modal>
  );
}
