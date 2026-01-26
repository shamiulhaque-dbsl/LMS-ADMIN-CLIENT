import { use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Link from "next/link";
import CoourseTableAction from "@/features/course/components/CoourseTableAction";
import type { Course } from "@/features/course/types";
import { EmptyList } from "@/components/EmptyList";
import { formatDateFull } from "@/lib/utils/date";

/*
  # TODO:
  1. Implement pagination
  2. Handle status dynamically with reuseable component
*/
type CourseProps = {
  fetchCourses: () => Promise<Course[] | null>;
};

export default function CourseTable({ fetchCourses }: CourseProps) {
  const courses = use(fetchCourses());

  if (!courses || courses?.length === 0) return <EmptyList title="No courses found" />;

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Enrolled Students</TableHead>
          <TableHead>Created On</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        {courses.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell>{++index}</TableCell>
            <TableCell>
              <Link
                href={`/dashboard/courses/${course.id}/edit`}
                target="_blank"
                prefetch={false}
                className="text-blue-600"
              >
                {course?.title}
              </Link>
            </TableCell>
            <TableCell>{course?.category_name}</TableCell>
            <TableCell>
              <span className="font-medium text-green-600">{course.price}</span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600">
                {course?.enrollment_count}{" "}
                {course.enrollment_count === (1 || 0) ? "student" : "students"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600">
                {course.created_at && formatDateFull(course.created_at)}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {course?.status}
              </span>
            </TableCell>
            <TableCell>
              <CoourseTableAction course={course} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
