import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { getCourses } from "@/api/course";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Course } from "@/features/course/types";
import { Tooltip } from "@/components/ui/Tooltip";
import CourseTable from "@/features/course/components/CourseTable";
import Text from "@/components/ui/Text";
import { ErrorMessage } from "@/components/ErrorMessage";

/*
  #TODO: Add filters
*/
const fetchCourses = async (): Promise<Course[] | null> => (await getCourses()).data ?? [];

export default function ManageCourse() {
  return (
    <>
      {/* <CoursesFilters /> */}

      <Card className="border-none bg-white">
        <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
          <Text className="text-dark text-lg font-medium">Courses List</Text>

          <div className="flex gap-3">
            <Tooltip content="Export as CSV" placement="top">
              <Button size="sm" variant="outlineGray" type="button">
                <Icons.fileType className="h-4 w-4 text-blue-500" />
              </Button>
            </Tooltip>
            <Tooltip content="Export as Excel" placement="top">
              <Button size="sm" variant="outlineGray" type="button">
                <Icons.fileSpreadsheet className="h-4 w-4 text-green-600" />
              </Button>
            </Tooltip>

            {/* Add Course */}
            <Link href="/dashboard/courses/create">
              <Button size="sm" variant="default" type="button">
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Course
              </Button>
            </Link>
          </div>
        </Card.Header>

        <Card.Content className="p-4 sm:p-6">
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense fallback={<TableSkeleton columns={11} rowCount={5} />}>
              <CourseTable fetchCourses={fetchCourses} />
            </Suspense>
          </ErrorBoundary>
        </Card.Content>
      </Card>
    </>
  );
}
