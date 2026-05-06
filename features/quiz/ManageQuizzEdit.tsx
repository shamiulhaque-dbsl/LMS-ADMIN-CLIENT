import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import QuizQuestionContainer from "./components/QuizzQuestionContainer";
import { getCoursesForSelect } from "@/api/course";
import { getQuestions } from "@/api/quiz/question";
import { getQuizz } from "@/api/quiz";
import { QuizQuestionsSkeleton } from "./components/QuizQuestionsSkeleton";
import { QuizFormSkeleton } from "./components/QuizFormSkeleton";
import QuizFormSection from "./components/QuizFormSection";

export default function ManageQuizzEdit({ quizId }: { quizId: number }) {
  const coursesPromise = getCoursesForSelect();
  const quizQuestionsPromise = getQuestions(quizId);
  const quizPromise = getQuizz(quizId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ErrorBoundary
        fallback={
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Failed to load quiz form. Please try again.</p>
          </div>
        }
      >
        <Suspense fallback={<QuizFormSkeleton />}>
          <QuizFormSection quizId={quizId} coursesPromise={coursesPromise} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Failed to load questions. Please try again.</p>
          </div>
        }
      >
        <Suspense fallback={<QuizQuestionsSkeleton />}>
          <QuizQuestionContainer quizQuestionsPromise={quizQuestionsPromise} quizPromise={quizPromise} quizId={quizId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
