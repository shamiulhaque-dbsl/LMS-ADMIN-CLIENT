import QuizzeFilters from "@/features/quiz/components/QuizzFilters";
import QuizzTableWrapper from "@/features/quiz/components/QuizzTableWrapper";
import { Suspense } from "react";

interface PageProps {
  filters: {
    dateFrom?: string;
    dateTo?: string;
    course?: string;
    instructor?: string;
    status?: string;
    page?: number;
  };
}

export default function ManageQuizz({ filters }: PageProps) {
  return (
    <>
      <QuizzeFilters currentFilters={filters} />
      <Suspense
        key={JSON.stringify(filters)}
        fallback={<div className="text-gray-800">Loading...</div>}
      >
        <QuizzTableWrapper filters={filters} />
      </Suspense>
    </>
  );
}
