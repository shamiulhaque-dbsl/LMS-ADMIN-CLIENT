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
import Pagination from "@/features/assignment/components/Pagination";
import { useAssignmentStore } from "@/dashboard/assignments/store/assignmentStore";
import { useEffect, useState } from "react";
import { AssignmentSubmission } from "@/features/assignment/types/type-matric";
import { getAssignmentWiseSubmission } from "@/api/assignment";
import { formatDateTime } from "@/lib/utils/date";
import { Button } from "@/components/ui/Button";
import AssignmentSubmissionModal from "./AssignmentSubmissionModal";

export default function SubmissionTable({ id }: { id: any }) {
    const [assignmentSubmissions, setAssignmentSubmission] = useState<AssignmentSubmission[]>([]);
    const [assignmentQuestion, setAssignmentQuestion] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);

    useEffect(() => {
        const loadAssignments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getAssignmentWiseSubmission(id);
                const submissions = (response?.data as any)?.submissions || [];
                const assignment = (response?.data as any)?.assignment || null;
                setAssignmentSubmission(submissions);
                setAssignmentQuestion(assignment);
                // setTotalPages(response?.totalPages || 1);
                // setTotalRecords(response?.totalRecords || 0);
            } catch {
                setError("Failed to load assignments. Please try again.");
                setAssignmentSubmission([]);
            } finally {
                setLoading(false);
            }
        };

        loadAssignments();
    }, [id]);

    return (
        <>
            <Table className="overflow-y-clip bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Obtained Marks</TableHead>
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
                                    <span className="ml-3">Loading assignment submissions list...</span>
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
                    ) : assignmentSubmissions.length === 0 ? (
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
                                    No assignment submissions found
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        assignmentSubmissions.map((assignment, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {assignment?.student?.fullName} ({assignment?.student?.studentId})
                                </TableCell>
                                <TableCell>
                                    {assignment?.submittedAt && formatDateTime(assignment?.submittedAt)}
                                </TableCell>
                                <TableCell>
                                    {assignment?.marksObtained || (
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                            pending
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                        {assignment?.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        className="w-[9rem]"
                                        variant="outlineGray"
                                        onClick={() => {
                                            setSelectedSubmission(assignment);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        View Submission
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} className="py-4">
                            <Pagination
                                currentPage={1}
                                totalPages={totalPages}
                                totalRecords={totalRecords}
                                onPageChange={(page) => useAssignmentStore.getState().setFilters({ page })}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>

            <AssignmentSubmissionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                submissionData={selectedSubmission}
                assignmentDetails={assignmentQuestion}
            />
        </>
    );
}
