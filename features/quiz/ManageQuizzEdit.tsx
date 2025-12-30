import { QuizzForm } from "@/features/quiz/components/QuizzForm";
import QuizQuestionContainer from "./components/QuizzQuestionContainer";
import { getCoursesForSelect } from "@/api/course";
import { use } from "react";
import { getQuizz } from "@/api/quiz";

export default function ManageQuizzEdit({ quizId }: { quizId: number | string }) {
  const res = use(getCoursesForSelect());
  const courses = res?.data ?? [];

  const { data: quiz } = use(getQuizz(quizId));

  return (
    <>
      {/* Pass Quizz Data as props */}
      <div className="max-w-xl">
        <QuizzForm courses={courses} quiz={quiz} />
      </div>

      {/* Manage Quiz Question */}
      <QuizQuestionContainer />
    </>
  );
}
