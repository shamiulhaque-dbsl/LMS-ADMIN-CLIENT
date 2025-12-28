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
import Pagination from "@/features/quiz/components/Pagination";
import QuizTableAction from "@/features/quiz/components/QuizzTableAction";
import { useQuizzStore } from "@/dashboard/quizzes/store/quizzStore";
import { useEffect, useState } from "react";

import { Quizz, fetchQuizzes } from "@/dashboard/quizzes/lib/api";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CourseTable() {
  const { filters, setFilters } = useQuizzStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const params = {
      dateFrom: searchParams.get("dateFrom") || "",
      dateTo: searchParams.get("dateTo") || "",
      course: searchParams.get("course") || "",
      instructor: searchParams.get("instructor") || "",
      status: searchParams.get("status") || "",
      page: parseInt(searchParams.get("page") || "1", 10),
    };

    setFilters(params);
  }, [searchParams, setFilters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.set("dateTo", filters.dateTo);
    if (filters.course) params.set("category", filters.course);
    if (filters.instructor) params.set("instructor", filters.instructor);
    if (filters.status) params.set("status", filters.status);
    if (filters.page > 1) params.set("page", filters.page.toString());

    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    router.push(newUrl);
  }, [filters, pathname, router]);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchQuizzes({
          ...filters,
          limit: 10,
        });

        setQuizzes(response.data);
        setTotalPages(response.totalPages);
        setTotalRecords(response.totalRecords);
      } catch (err) {
        setError("Failed to load courses. Please try again.");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [filters]);

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Questions</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {loading ? (
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
          quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.id}</TableCell>
              <TableCell>{quiz?.title}</TableCell>
              <TableCell>Final Quiz</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {quiz?.status}
                </span>
              </TableCell>
              {/* Table action */}
              <TableCell>
                <QuizTableAction item={quiz} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={11} className="py-4">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              onPageChange={(page) => useQuizzStore.getState().setFilters({ page })}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
