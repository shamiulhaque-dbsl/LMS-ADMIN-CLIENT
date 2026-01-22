"use client";
import React, { useEffect, useState } from "react";
import { X, FileText, Calendar, User, Mail, CheckCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils/date";
import { submissionsGrading } from "@/api/assignment";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const AssignmentSubmissionModal = ({ isOpen, onClose, submissionData, assignmentDetails }: any) => {
    const [marksObtained, setMarksObtained] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMarksObtained(submissionData?.marksObtained?.toString() || "");
        setFeedback(submissionData?.feedback || "");
    }, [submissionData]);

    const handleSubmitGrade = async () => {
        if (!marksObtained || !feedback) return;

        setIsSubmitting(true);

        try {
            const response = await submissionsGrading(submissionData.submissionId, {
                totalMarks: parseFloat(marksObtained),
                notes: feedback,
            });

            if (response.success) {
                toast.success("Grade submitted successfully");
                onClose(false);
            }
        } catch (error) {
            console.error("Error submitting grade:", error);
            toast.error("Failed to submit grade");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gray-600 text-white p-6 flex justify-between items-start">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3">{assignmentDetails.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm">
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{submissionData?.student?.fullName || ""}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span>{submissionData?.student?.email || ""}</span>
                            </div>
                            {submissionData.submittedAt &&
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Submitted:  {formatDateTime(submissionData.submittedAt)}</span>
                                </div>}

                        </div>
                    </div>
                    <button
                        onClick={() => onClose(false)}
                        className="text-white hover:bg-blue-800 rounded-full p-2 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Two Column Layout */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Left Column - Assignment & Submission Details */}
                    <div className="w-2/3 p-6 overflow-y-auto border-r border-gray-200">
                        {/* Assignment Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Assignment Description
                            </h3>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                                {assignmentDetails.description}
                            </p>
                        </div>

                        {/* Notes */}
                        {assignmentDetails.notes && (
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Notes</h3>
                                <p className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    {assignmentDetails.notes}
                                </p>
                            </div>
                        )}

                        {/* Resources */}
                        {assignmentDetails.resources && (
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Resources</h3>
                                <a
                                    href={assignmentDetails.resources}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline break-all"
                                >
                                    {assignmentDetails.resources}
                                </a>
                            </div>
                        )}

                        {/* Student Submission */}
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Student Submission
                            </h3>
                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                <p className="text-gray-800 whitespace-pre-wrap">{submissionData.textAnswer}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Grading System */}
                    <div className="w-1/3 p-6 bg-gray-50 overflow-y-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Grade Submission</h3>

                        <div className="space-y-4">
                            {/* Total Marks Display */}
                            <div className="bg-white p-3 rounded-lg border-2 border-orange-200">
                                <p className="text-sm text-gray-600 mb-1">Total Marks</p>
                                <p className="text-2xl font-bold text-orange-600">{assignmentDetails.totalMarks}</p>
                            </div>

                            {/* Marks Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Marks Obtained <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max={assignmentDetails.totalMarks}
                                    step="0.5"
                                    value={marksObtained}
                                    onChange={(e) => setMarksObtained(e.target.value)}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Out of ${assignmentDetails.totalMarks}`}
                                />
                            </div>

                            {/* Feedback Textarea */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feedback <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    placeholder="Provide detailed feedback for the student..."
                                ></textarea>
                            </div>

                            {/* Submit Buttons */}
                            <div className="space-y-3 pt-4">
                                <Button
                                    onClick={handleSubmitGrade} type="button" variant="secondary" size="md" className="w-full">
                                    {isSubmitting ? "Submitting..." : "Submit Grade"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmissionModal;