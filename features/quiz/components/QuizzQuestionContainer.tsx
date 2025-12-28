"use client";

import { QuizzQuestions } from "@/features/quiz/components/QuizzQuestions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
export default function QuizQuestionContainer() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="my-10 max-w-4xl">
      <Card className="border-none">
        <Card.Header className="flex justify-between border-b pb-4">
          <Card.Title>Quizz Questions</Card.Title>
          <Button variant="default" size="sm" onClick={() => openModal("question-add-modal")}>
            Add New Question
          </Button>
        </Card.Header>

        {/* Questions */}
        <QuizzQuestions />

        {/* Modal */}
        <QuestionModal id="question-add-modal" />
      </Card>
    </div>
  );
}
