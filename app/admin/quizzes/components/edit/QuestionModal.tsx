"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

interface Option {
  id: number;
  value: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  description: string;
  questionType: "multiple_choice" | "single_choice" | "true_false";
  point: string;
  options: Option[];
}

interface QuestionModalProps {
  id: string;
  question?: Question;
}

export function QuestionModal({ id, question }: QuestionModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const [form, setForm] = useState({
    title: "",
    description: "",
    questionType: "",
    point: "",
  });

  const [numberOfOptions, setNumberOfOptions] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);

  // ------------------------
  // Prefill for Edit Mode
  // ------------------------
  useEffect(() => {
    if (question) {
      setForm({
        title: question.title,
        description: question.description,
        questionType: question.questionType,
        point: question.point,
      });
      setOptions(question.options);
      setNumberOfOptions(question.options.length);
    }
  }, [question]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "questionType") {
      setNumberOfOptions(0);
      setOptions([]);
    }
  };

  const handleOptionCount = (value: string) => {
    if (value === "") {
      setNumberOfOptions(0);
      setOptions([]);
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    if (num >= 2 && num <= 10) {
      setNumberOfOptions(num);
      const updated = Array.from({ length: num }, (_, i) => ({
        id: i + 1,
        value: options[i]?.value || "",
        isCorrect: options[i]?.isCorrect || false,
      }));
      setOptions(updated);
    } else {
      setNumberOfOptions(num); // show input, but don't render options if invalid
    }
  };

  const handleOptionChange = (id: number, value: string) => {
    setOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, value } : opt)));
  };

  const handleDeleteOption = (id: number) => {
    const updated = options.filter((opt) => opt.id !== id);
    setOptions(updated);
    setNumberOfOptions(updated.length);
  };

  const handleSelectCorrect = (id: number) => {
    if (form.questionType === "multiple_choice") {
      setOptions((prev) =>
        prev.map((opt) => (opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt))
      );
    } else {
      setOptions((prev) => prev.map((opt) => ({ ...opt, isCorrect: opt.id === id })));
    }
  };

  const renderOptionInputs = () => {
    if (!["multiple_choice", "single_choice", "true_false"].includes(form.questionType))
      return null;

    return (
      <div className="mt-4 space-y-3">
        <div>
          <Input
            id="numOptions"
            label="Number of Options"
            type="number"
            placeholder="Enter number of options (2–10)"
            value={numberOfOptions === 0 ? "" : numberOfOptions}
            onChange={(e) => handleOptionCount(e.target.value)}
            required
          />

          {/* Instruction */}
          <p className="text-xs text-gray-500">
            You can create a minimum of <span className="font-semibold">2</span> and a maximum of{" "}
            <span className="font-semibold">10</span> options.
          </p>
        </div>

        {options.map((opt, idx) => (
          <div
            key={opt.id}
            className="flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
          >
            {form.questionType === "multiple_choice" ? (
              <input
                type="checkbox"
                checked={opt.isCorrect}
                onChange={() => handleSelectCorrect(opt.id)}
                className="h-4 w-4 cursor-pointer text-blue-600"
              />
            ) : (
              <input
                type="radio"
                name="singleChoice"
                checked={opt.isCorrect}
                onChange={() => handleSelectCorrect(opt.id)}
                className="h-4 w-4 cursor-pointer text-blue-600"
              />
            )}

            <Input
              placeholder={`Option ${idx + 1}`}
              value={opt.value}
              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
              className="flex-1"
            />

            <button
              type="button"
              onClick={() => handleDeleteOption(opt.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Icons.trash size={18} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    console.log({
      ...form,
      options,
    });
    closeModal(id);
  };

  return (
    <Modal id={id}>
      <ModalOverlay id={id} />
      <ModalContent id={id} size="2xl">
        <ModalClose id={id} />
        <ModalHeader className="border-b">
          <ModalTitle>{question ? "Edit Question" : "Add New Question"}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Textarea
              name="description"
              id="description"
              label="Question Title"
              required
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <Input
              id="point"
              name="point"
              label="Mark/Point"
              placeholder="Point (e.g., 5)"
              value={form.point}
              onChange={(e) => handleChange("point", e.target.value)}
            />

            {/* Question Type */}
            <div>
              <label className="label-base" htmlFor="questionType">
                Question Type<span className="required-star">*</span>
              </label>
              <select
                value={form.questionType}
                onChange={(e) => handleChange("questionType", e.target.value)}
                className="input-base"
              >
                <option value="">Select question type</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="single_choice">Single Choice</option>
                <option value="true_false">True/False</option>
              </select>
            </div>

            {/* Render dynamic option fields */}
            {renderOptionInputs()}
          </div>
        </ModalBody>
        <ModalFooter className="border-t">
          <Button variant="outline" size="md" onClick={() => closeModal(id)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="default" size="md">
            {question ? "Update Question" : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
