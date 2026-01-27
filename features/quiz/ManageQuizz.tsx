import QuizzTableWrapper from "@/features/quiz/components/QuizzTableWrapper";
import { Suspense } from "react";

// interface PageProps {
//   filters: {
//     dateFrom?: string;
//     dateTo?: string;
//     course?: string;
//     instructor?: string;
//     status?: string;
//     page?: number;
//   };
// }

export default function ManageQuizz() {
  return (
    <>
      {/* <QuizzeFilters currentFilters={filters} /> */}
      <Suspense fallback={<div className="text-gray-800">Loading...</div>}>
        <QuizzTableWrapper />
      </Suspense>
    </>
  );
}
