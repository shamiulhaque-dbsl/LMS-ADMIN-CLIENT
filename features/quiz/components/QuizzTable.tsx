"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import QuizTableAction from "@/features/quiz/components/QuizzTableAction";
//import { useSearchParams, usePathname, useRouter } from "next/navigation";
import type { QuizList } from "../types";

interface QuizzTableProps {
  quizzes: QuizList;
  currentPage?: number;
  totalPages?: number;
  totalRecords?: number;
}

export default function CourseTable({
  quizzes,
}: QuizzTableProps) {
  if (quizzes.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No quizzes found</p>
      </div>
    );
  }
  // const { filters, setFilters } = useQuizzStore();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Questions</TableHead>
          <TableHead>Time(Min)</TableHead>
          <TableHead>Total Score</TableHead>
          <TableHead>Passing Score</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {quizzes.map((quiz, index) => (
          <TableRow key={quiz.quizId}>
            {/* <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell> */}
            <TableCell>{++index}</TableCell>
            <TableCell>
              <span className="font-medium">{quiz.title}</span>
              <p className="text-sm text-gray-600">{quiz.course?.title}</p>
            </TableCell>
            <TableCell>{quiz.questionsCount}</TableCell>
            <TableCell>{quiz.timeLimitMinutes}</TableCell>
            <TableCell>{quiz.totalPoint}</TableCell>
            <TableCell>{quiz.passingPoint}</TableCell>
            <TableCell>{quiz.studentsCount}</TableCell>
            <TableCell>
              {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : ""}
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {quiz.status}
              </span>
            </TableCell>
            <TableCell>
              <QuizTableAction quiz={quiz} />
            </TableCell>
          </TableRow>
        ))}
        {/* {loading ? (
          <TableRow>
            <TableCell colSpan={11} className="py-8 text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                <span className="ml-3">Loading quizzes...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={11} className="py-8 text-center">
              <div className="text-red-500">
                <svg
                  className="mx-auto mb-2 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            </TableCell>
          </TableRow>
        ) : quizzes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={11} className="py-8 text-center">
              <div className="text-gray-500">
                <svg
                  className="mx-auto mb-2 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                No quizzes found
              </div>
            </TableCell>
          </TableRow>
        ) : (
          quizzes.map((quiz, index) => (
            <TableRow key={quiz.quizId}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                <span className="font-medium text-text-dark">{quiz?.title}</span>
                <p className="text-sm text-gray-600">{quiz?.course?.title} Course</p>
              </TableCell>
              <TableCell>{quiz?.questionsCount}</TableCell>
              <TableCell>{quiz?.timeLimitMinutes}</TableCell>
              <TableCell>{quiz?.totalPoint}</TableCell>
              <TableCell>{quiz?.passingPoint}</TableCell>
              <TableCell>{quiz?.studentsCount}</TableCell>
              <TableCell>
                {quiz?.createdAt ? new Date(quiz?.createdAt).toLocaleDateString() : ""}
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {quiz?.status}
                </span>
              </TableCell>
              <TableCell>
                <QuizTableAction quiz={quiz} />
              </TableCell>
            </TableRow>
          ))
        )} */}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={11} className="py-4">
            {/* <Pagination
              currentPage={1}
              totalPages={10}
              totalRecords={100}
              onPageChange={(page) => useQuizzStore.getState().setFilters({ page })}
            /> */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
