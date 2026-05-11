"use client";

import { QuizzQuestions } from "@/features/quiz/components/QuizzQuestions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
import { use } from "react";
import { ApiResponse } from "@/api";
import type { QuizQuestion, Quizz } from "@/features/quiz/types";
import { toast } from "sonner";

type Props = {
  quizQuestionsPromise: Promise<ApiResponse<QuizQuestion[]>>;
  quizPromise: Promise<ApiResponse<Quizz>>;
  quizId: number | string;
};

export default function QuizQuestionContainer({ quizQuestionsPromise, quizPromise, quizId }: Props) {
  const response = use(quizQuestionsPromise);
  const { data: quiz } = use(quizPromise);

  // Extract questions from the response
  const questionsData = response?.data;
  console.log("ManageQuizzEdit response:", response);
  console.log("ManageQuizzEdit questionsData:", questionsData);
  console.log("ManageQuizzEdit questionsData type:", typeof questionsData);
  console.log("ManageQuizzEdit is array?:", Array.isArray(questionsData));

  const openModal = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen("question-add-modal"));

  // Handle both array and nested object responses
  let quizQuestions: QuizQuestion[] = [];
  if (Array.isArray(questionsData)) {
    quizQuestions = questionsData;
  } else if (questionsData && typeof questionsData === 'object') {
    const obj = questionsData as Record<string, unknown>;
    quizQuestions = Array.isArray(obj.questions) ? obj.questions : [];
  }

  // Calculate total marks used by existing questions
  const totalMarksUsed = quizQuestions?.reduce((sum: number, q: QuizQuestion) => sum + (q.point || 0), 0) || 0;
  const totalMarksAvailable = quiz?.totalPoint || 0;
  const remainingMarks = totalMarksAvailable - totalMarksUsed;

  const handleAddQuestion = () => {
    if (remainingMarks <= 0) {
      toast.error(`No marks available. All ${totalMarksAvailable} marks are already used by existing questions.`);
      return;
    }
    openModal("question-add-modal", {
      quizId: quizId,
      quizTotalPoints: quiz?.totalPoint,
      remainingMarks: remainingMarks
    });
  };

  return (
    <Card className="border border-gray-200">
      <Card.Header className="flex justify-between border-b p-4">
        <Card.Title>Quizz Questions</Card.Title>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddQuestion}
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
              onClick={handleAddQuestion}
            >
              Add Your First Question
            </Button>
          </div>
        ) : (
          <QuizzQuestions quizQuestions={quizQuestions} quizId={quizId} quiz={quiz} />
        )}
      </Card.Content>

      {/* Modal */}
      {isOpen && <QuestionModal id="question-add-modal" />}
    </Card>
  );
}
