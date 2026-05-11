"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionFormValues, questionSchema } from "../lib/validations/question";
import type { QuestionFormData, QuizQuestion } from "../types";
import { useQuizQuestionAction } from "../hooks/useQuizQuesAction";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";

interface QuestionModalProps {
  id: string;
  question?: QuizQuestion;
}

export function QuestionModal({ id }: QuestionModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const modalPayload = useModalStore((state) => state.payloads);

  const { handleApiErrors } = useHandleApiErrors<QuestionFormData>();

  const quizId = modalPayload?.[id]?.quizId;
  const quizTotalPoints = modalPayload?.[id]?.quizTotalPoints;
  const remainingMarks = modalPayload?.[id]?.remainingMarks;
  const question = modalPayload?.[id]?.question;
  const isEditMode = !!question;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: question ?? {
      question: "",
      explanation: "",
      questionType: "single_choice",
      point: 1,
      options: [
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const questionType = watch("questionType");

  const { create, update, loading: isSubmitting } = useQuizQuestionAction();

  const handleCorrectAnswerChange = (index: number, checked: boolean) => {
    if (questionType === "single_choice" || questionType === "true_false") {
      // Uncheck all others
      fields.forEach((_, i) => {
        setValue(`options.${i}.isCorrect`, i === index ? checked : false);
      });
    } else {
      setValue(`options.${index}.isCorrect`, checked);
    }
  };

  const onSubmit = async (data: QuestionFormData) => {
    // Validate that question points don't exceed quiz total points
    if (quizTotalPoints && data.point > quizTotalPoints) {
      toast.error(`Question marks cannot exceed quiz total marks (${quizTotalPoints})`);
      return;
    }

    // Validate that question points don't exceed remaining marks
    if (!isEditMode && remainingMarks && data.point > remainingMarks) {
      toast.error(`Question marks cannot exceed remaining marks (${remainingMarks})`);
      return;
    }

    const result = isEditMode
      ? await update(quizId, question.id, data)
      : await create(quizId, data);
    if (result && !result.success) {
      toast.error(result.message || "Failed to create question");
      return handleApiErrors(result, setError);
    }

    toast.success(isEditMode ? "Question updated successfully" : "Question created successfully");
    if (!isEditMode) {
      reset();
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="space-y-4">
              <Textarea
                {...register("question")}
                id="question"
                label="Question Title"
                required
                rows={3}
                error={errors.question?.message}
              />

              <Textarea
                {...register("explanation")}
                id="explanation"
                label="Explanation (Optional)"
                rows={2}
                error={errors.explanation?.message}
              />

              <Input
                {...register("point", { valueAsNumber: true })}
                id="point"
                label="Points"
                type="number"
                min={1}
                max={100}
                required
                error={errors.point?.message}
              />

              <div>
                <label className="label-base" htmlFor="questionType">
                  Question Type<span className="required-star">*</span>
                </label>
                <select
                  {...register("questionType")}
                  className={`input-base ${errors.questionType ? "border-red-500" : ""}`}
                >
                  <option value="single_choice">Single Choice</option>
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="true_false">True/False</option>
                </select>
                {errors.questionType && (
                  <p className="text-xs text-red-500 mt-1">{errors.questionType.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label-base">
                    Answer Options<span className="required-star">*</span>
                  </label>
                  {fields.length < 10 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => append({ option: "", isCorrect: false })}
                    >
                      <Icons.plus size={16} className="mr-1" />
                      Add Option
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <Controller
                        control={control}
                        name={`options.${index}.isCorrect`}
                        render={({ field: checkField }) => (
                          <input
                            type={questionType === "multiple_choice" ? "checkbox" : "radio"}
                            checked={checkField.value}
                            onChange={(e) => handleCorrectAnswerChange(index, e.target.checked)}
                            className="mt-2 h-4 w-4 cursor-pointer text-blue-600"
                          />
                        )}
                      />

                      <div className="flex-1">
                        <Input
                          {...register(`options.${index}.option`)}
                          placeholder={`Option ${index + 1}`}
                          error={errors.options?.[index]?.option?.message}
                        />
                      </div>

                      {fields.length > 2 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                        >
                          <Icons.trash size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {errors.options && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.options.message || errors.options.root?.message}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {questionType === "multiple_choice"
                    ? "Select one or more correct answers"
                    : "Select exactly one correct answer"}
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="border-t">
            <Button
              variant="outline"
              size="md"
              onClick={() => closeModal(id)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="md" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.loader size={16} className="animate-spin mr-2" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Question"
              ) : (
                "Create Question"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
