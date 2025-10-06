"use client";

import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface SectionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; status: string }) => void;
}

export function SectionModal({ open, onClose, onSave }: SectionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = () => {
    onSave({ title, description, status });
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Add / Edit Section" size="xl">
      <div className="space-y-3">
        <Input
          name="title"
          label="Section Title"
          placeholder="Section Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
}
