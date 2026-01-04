import { use } from "react";
import { notFound } from "next/navigation";
import { getQuizz } from "@/api/quiz";
import { QuizzForm } from "@/features/quiz/components/QuizzForm";
import type { Course } from "@/features/course/types";
import { ApiResponse } from "@/api";

interface QuizFormSectionProps {
  quizId: number;
  coursesPromise: Promise<ApiResponse<Course[]>>;
}

export default function QuizFormSection({ quizId, coursesPromise }: QuizFormSectionProps) {
  const [coursesRes, quizRes] = use(Promise.all([coursesPromise, getQuizz(quizId)]));

  const courses = coursesRes?.data ?? [];
  const quiz = quizRes?.data;

  if (!quiz) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
        <QuizzForm courses={courses} quiz={quiz} />
      </div>
    </div>
  );
}
