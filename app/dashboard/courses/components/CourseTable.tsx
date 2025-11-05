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
import Link from "next/link";
import Pagination from "./Pagination";
import CoourseTableAction from "./CoourseTableAction";
import { useCourseStore } from "../store/courseStore";
import { useEffect, useState } from "react";

import { Course, fetchCourses } from "../lib/api";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CourseTable() {
  const { filters, setFilters } = useCourseStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const params = {
      dateFrom: searchParams.get("dateFrom") || "",
      dateTo: searchParams.get("dateTo") || "",
      category: searchParams.get("category") || "",
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
    if (filters.category) params.set("category", filters.category);
    if (filters.instructor) params.set("instructor", filters.instructor);
    if (filters.status) params.set("status", filters.status);
    if (filters.page > 1) params.set("page", filters.page.toString());

    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    router.push(newUrl);
  }, [filters, pathname, router]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchCourses({
          ...filters,
          limit: 10,
        });

        setCourses(response.data);
        setTotalPages(response.totalPages);
        setTotalRecords(response.totalRecords);
      } catch (err) {
        setError("Failed to load courses. Please try again.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [filters]);

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Lesson & Section</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Enrolled Students</TableHead>
          <TableHead>Created On</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        {loading ? (
          <TableRow>
            <TableCell colSpan={11} className="py-8 text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                <span className="ml-3">Loading courses...</span>
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
        ) : courses.length === 0 ? (
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
                No courses found
              </div>
            </TableCell>
          </TableRow>
        ) : (
          courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>
                <Link href={`/admin/courses/${course.id}`} className="text-blue-600">
                  {course?.title}
                </Link>
              </TableCell>
              <TableCell>{course?.category}</TableCell>
              <TableCell>
                <span className="text-gray-600">{course?.lessons} Lessons</span> &{" "}
                <span className="text-gray-600">{course?.sections} Sections</span>
              </TableCell>
              <TableCell>
                <span className="font-medium text-green-600">{course?.price}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{course?.sales} Sales</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{course?.students} Students</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{course?.createdAt}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{course?.updatedAt}</span>
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {course?.status}
                </span>
              </TableCell>
              {/* Table action */}
              <TableCell>
                <CoourseTableAction item={course} />
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
              onPageChange={(page) => useCourseStore.getState().setFilters({ page })}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
