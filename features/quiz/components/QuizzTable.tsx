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
import type { QuizList } from "../types";

interface QuizzTableProps {
  quizzes: QuizList;
  currentPage?: number;
  totalPages?: number;
  totalRecords?: number;
}

export default function CourseTable({ quizzes }: QuizzTableProps) {
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
