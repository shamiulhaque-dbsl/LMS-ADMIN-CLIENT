import QuizzeFilters from "@/admin/quizzes/components/QuizzFilters";
import QuizzTableWrapper from "@/admin/quizzes/components/QuizzTableWrapper";
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
