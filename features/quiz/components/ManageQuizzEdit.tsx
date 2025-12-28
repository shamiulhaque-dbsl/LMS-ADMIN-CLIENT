import { QuizzForm } from "@/features/quiz/components/QuizzForm";
import QuizQuestionContainer from "./QuizzQuestionContainer";

export default function ManageQuizzEdit() {
  return (
    <>
      {/* Pass Quizz Data as props */}
      <div className="max-w-xl">
        <QuizzForm />
      </div>

      {/* Manage Quiz Question */}
      <QuizQuestionContainer />
    </>
  );
}
