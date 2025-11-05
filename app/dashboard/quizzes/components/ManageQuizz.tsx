import QuizzeFilters from "@/dashboard/quizzes/components/QuizzFilters";
import QuizzTableWrapper from "@/dashboard/quizzes/components/QuizzTableWrapper";
import { Suspense } from "react";

export default function ManageQuizz() {
  return (
    <>
      <QuizzeFilters />
      <Suspense fallback={<div>Loading quizzes...</div>}>
        <QuizzTableWrapper />
      </Suspense>
    </>
  );
}
