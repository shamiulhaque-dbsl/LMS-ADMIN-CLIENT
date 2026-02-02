"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import AssignmentTableAction from "@/features/assignment/components/AssignmentTableAction";
import { useAssignmentStore } from "@/dashboard/assignments/store/assignmentStore";
import { useEffect, useState } from "react";
import { Assignment } from "@/features/assignment/types/type-matric";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getAssignments } from "@/api/assignment";
import { formatDateTime } from "@/lib/utils/date";

export default function AssignmentTable() {
  const { filters, setFilters } = useAssignmentStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [totalPages, setTotalPages] = useState(1);
  // const [totalRecords, setTotalRecords] = useState(0);

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
    if (filters.course) params.set("course", filters.course);
    if (filters.status) params.set("status", filters.status);
    if (filters.page > 1) params.set("page", filters.page.toString());

    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    router.push(newUrl);
  }, [filters, pathname, router]);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAssignments();
        setAssignments(response?.data || []);
        // setTotalPages(response?.totalPages || 1);
        // setTotalRecords(response?.totalRecords || 0);
      } catch {
        setError("Failed to load assignments. Please try again.");
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [filters]);

  const handleDeleteAssignment = (deletedId: number) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment.assignmentId !== deletedId)
    );
    // Also update total records count if you're tracking it
    // setTotalRecords((prev) => Math.max(0, prev - 1));
  };

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Total Marks</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                <span className="ml-3">Loading assignments...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
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
        ) : assignments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
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
                No assignments found
              </div>
            </TableCell>
          </TableRow>
        ) : (
          assignments?.map((assignment, index) => (
            <TableRow key={assignment.assignmentId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{assignment?.title}</TableCell>
              <TableCell>{assignment?.totalMarks}</TableCell>
              <TableCell>{assignment?.dueDate && formatDateTime(assignment?.dueDate)}</TableCell>
              <TableCell>
                <span className={`${assignment?.status === "Expired" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"} rounded-full  px-2 py-1 text-xs font-medium `}>
                  {assignment?.status}
                </span>
              </TableCell>
              <TableCell>
                <AssignmentTableAction item={assignment} onDelete={handleDeleteAssignment} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="py-4">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              onPageChange={(page) => useAssignmentStore.getState().setFilters({ page })}
            />
          </TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
