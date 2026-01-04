"use client";

import { QuizzQuestions } from "@/features/quiz/components/QuizzQuestions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
import { use } from "react";
import { ApiResponse } from "@/api";
import type { QuizQuestion } from "@/features/quiz/types";

type Props = {
  quizQuestionsPromise: Promise<ApiResponse<QuizQuestion[]>>;
  quizId: number | string;
};

export default function QuizQuestionContainer({ quizQuestionsPromise, quizId }: Props) {
  const { data: quizQuestions } = use(quizQuestionsPromise);

  const openModal = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen("question-add-modal"));

  return (
    <Card className="border border-gray-200">
      <Card.Header className="flex justify-between border-b p-4">
        <Card.Title>Quizz Questions</Card.Title>
        <Button
          variant="default"
          size="sm"
          onClick={() => openModal("question-add-modal", { quizId: quizId })}
        >
          Add New Question
        </Button>
      </Card.Header>

      <Card.Content className="p-4">
        {quizQuestions && quizQuestions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No questions yet</p>
            <Button
              variant="default"
              size="sm"
              onClick={() => openModal("question-add-modal", { quizId: quizId })}
            >
              Add Your First Question
            </Button>
          </div>
        ) : (
          <QuizzQuestions quizQuestions={quizQuestions} quizId={quizId} />
        )}
      </Card.Content>

      {/* Modal */}
      {isOpen && <QuestionModal id="question-add-modal" />}
    </Card>
  );
}
