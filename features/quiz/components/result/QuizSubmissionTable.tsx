"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { Quizz } from "../../types";
import { formatDateTime } from "@/lib/utils/date";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { getQuizzByAttemptId } from "@/api/quiz";
import { ResultsModalCard } from "./ResultsModalCard";

interface QuizzTableProps {
    quizQuestion: Quizz | null;
    submissionData: string[] | unknown[];
}

export default function QuizSubmissionTable({ quizQuestion, submissionData }: QuizzTableProps) {
    const [isModalOpen, setOpenModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = async (attemptId: string) => {
        setIsLoading(true);
        setOpenModal(true);
        const quizinfo = await getQuizzByAttemptId(attemptId);
        setSelectedResult(quizinfo?.data || null);
        setIsLoading(false);
    };

    if (submissionData.length === 0) {
        return (
            <div className="py-8 text-center text-gray-500">
                <p>No quizzes subission found</p>
            </div>
        );
    }

    return (
        <>
            <Table className="overflow-y-clip bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Quiz Title</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>SubmittedAt</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="bg-white">
                    {submissionData.map((resultList, index) => {
                        const result = resultList as Record<string, unknown>;
                        return (
                            <TableRow key={index}>
                                <TableCell>{++index}</TableCell>
                                <TableCell>
                                    {String((result?.student as Record<string, unknown>)?.fullName)}
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">{quizQuestion?.title}</span>
                                </TableCell>
                                <TableCell>{String(result?.score)}</TableCell>
                                <TableCell>
                                    {result?.submittedAt ? formatDateTime(String(result.submittedAt)) : ""}
                                </TableCell>
                                <TableCell>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                        {String(result?.status)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="w-[7rem]"
                                        onClick={() => handleOpenModal(String(result?.id))}
                                        size="sm"
                                        variant="default"
                                        type="button"
                                    >
                                        View Result
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {isModalOpen && (
                <ResultsModalCard
                    results={selectedResult}
                    open={isModalOpen}
                    onClose={() => setOpenModal(false)}
                    loading={isLoading}
                />
            )}
        </>
    );
}
