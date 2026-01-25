import { getAllQuizSubmission } from "@/api/quiz";
import { Suspense, use } from "react";
import QuizSubmissionTable from "./components/result/QuizSubmissionTable";

export default function ManageResult({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const response = use(getAllQuizSubmission(id));

    const quizQuestion = response?.data?.quiz || null;
    const submissionData = (response?.data as unknown as Record<string, unknown>)?.results as unknown[] || [];

    return (
        <>
            <Suspense fallback={<div className="text-gray-800">Loading...</div>}>
                <QuizSubmissionTable quizQuestion={quizQuestion} submissionData={submissionData} />
            </Suspense>
        </>
    );
}