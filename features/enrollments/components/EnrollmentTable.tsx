"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/date";
import Pagination from "./Pagination";
import { getEnrollments } from "@/api/enrollment";
import { Enrollment } from "../types/type-matric";
import Image from "next/image";
import { useEnrollmentStore } from "@/app/dashboard/enrollments/store/enrollmentStore";

export default function EnrollmentTable() {
  const { filters, setFilters } = useEnrollmentStore();
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const params = {
      dateFrom: searchParams.get("dateFrom") || "",
      dateTo: searchParams.get("dateTo") || "",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: limit,
    };

    setFilters(params);
  }, [searchParams, setFilters, limit]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.set("dateTo", filters.dateTo);
    if (filters.page > 1) params.set("page", filters.page.toString());
    if (limit) params.set("limit", filters.limit.toString());


    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    router.push(newUrl);
  }, [filters, pathname, router, limit]);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getEnrollments({
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
          page: filters.page,
          limit: filters.limit,
        });

        setEnrollments(response?.data.data || []);
        setTotalPages(response?.data.pagination.totalPages || 1);
        setTotalRecords(response?.data.pagination.totalRecords || 0);
      } catch {
        setError("Failed to load assignments. Please try again.");
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [filters]);


  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Student</TableHead>
          <TableHead>Enrolled Type</TableHead>
          <TableHead>Enrolled Date</TableHead>
          <TableHead>Course Title</TableHead>


          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                <span className="ml-3">Loading enrollments data...</span>
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
        ) : enrollments.length === 0 ? (
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
                No enrollment found
              </div>
            </TableCell>
          </TableRow>
        ) : (
          enrollments?.map((enrollment, index) => (
            <TableRow key={enrollment.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={enrollment?.student?.avatar_url || "/images/noimage.png"}
                  alt={`image`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>{enrollment?.student?.name} <br /> {enrollment?.student?.email} </TableCell>
              <TableCell>{enrollment?.enrolled_type}</TableCell>
              <TableCell>{enrollment?.enrolled_at && formatDateTime(enrollment?.enrolled_at)}</TableCell>
              <TableCell>{enrollment?.course?.title}</TableCell>


              {/* <TableCell>
                <span className={`${assignment?.status === "Expired" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"} rounded-full  px-2 py-1 text-xs font-medium `}>
                  {assignment?.status}
                </span>
              </TableCell> */}
              {/* <TableCell>
                <AssignmentTableAction item={assignment} onDelete={handleDeleteAssignment} />
              </TableCell> */}
            </TableRow>
          ))
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={8} className="py-4">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={limit}
              setLimit={setLimit}
              onPageChange={(page) => useEnrollmentStore.getState().setFilters({ page })}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
