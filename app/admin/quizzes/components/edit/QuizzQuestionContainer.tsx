"use client";

import { QuizzQuestions } from "@/admin/quizzes/components/edit/QuizzQuestions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
export default function QuizQuestionContainer() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="max-w-4xl my-10">
      <Card className="border-none">
        <Card.Header className="border-b pb-4 flex justify-between">
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
