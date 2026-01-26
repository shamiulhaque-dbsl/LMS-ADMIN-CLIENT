"use client";

import { Card } from "@/components/ui/Card";
import { BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { OptionButton } from "./OptionButton";

interface ResultsCardProps {
    results: any;
    open: boolean;
    onClose: () => void;
    loading?: boolean;
}

function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );
}

export function ResultsModalCard({ results, open, onClose, loading = false }: ResultsCardProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-md px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 z-10"
                    disabled={loading}
                >
                    ✕
                </button>

                {loading ? (
                    <Card className="w-full shadow-none border-0">
                        {/* ===== SKELETON SCORE HEADER ===== */}
                        <Card.Header className="p-6 text-center border-b space-y-4">
                            <div className="flex items-center justify-center gap-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-32" />
                            </div>

                            <Skeleton className="h-12 w-24 mx-auto" />
                            <Skeleton className="h-4 w-40 mx-auto" />
                            <Skeleton className="h-6 w-56 mx-auto" />
                        </Card.Header>

                        {/* ===== SKELETON QUESTIONS ===== */}
                        <Card.Content className="space-y-6 p-6">
                            <div className="border-b pb-2">
                                <Skeleton className="h-6 w-48" />
                            </div>

                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-4">
                                    <Card.Content className="space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-6 w-full" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            {[1, 2, 3, 4].map((j) => (
                                                <Skeleton key={j} className="h-12 w-full" />
                                            ))}
                                        </div>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Content>
                    </Card>
                ) : !results ? (
                    <Card className="w-full shadow-none border-0">
                        <Card.Content className="flex flex-col items-center justify-center p-12">
                            <p className="text-lg text-gray-700">No results available</p>
                        </Card.Content>
                    </Card>
                ) : (
                    <Card id="top" className="w-full shadow-none border-0">
                        {/* ===== SCORE HEADER ===== */}
                        <Card.Header className="p-6 text-center border-b">
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                                <h3 className="text-lg font-medium">Your Score</h3>
                            </div>

                            <p className={`text-4xl font-bold ${getScoreColor(results.percentage)}`}>
                                {results.percentage}%
                            </p>

                            <p className="mt-1 text-muted-foreground">
                                {getScoreMessage(results.percentage)}
                            </p>

                            <p className="mt-2 text-lg font-bold">
                                You got {results.score} out of {results.totalScore} points
                            </p>
                        </Card.Header>

                        {/* ===== QUESTIONS ===== */}
                        <Card.Content className="space-y-6 p-6">
                            <h3 className="border-b pb-2 text-lg font-medium">
                                Question Summary
                            </h3>

                            {results.questions.map((q: any, qIndex: number) => {
                                const correctIndexes = q.options
                                    .map((opt: any, index: number) =>
                                        q.correctOptionIds.includes(opt.id) ? index : null
                                    )
                                    .filter((v: number | null): v is number => v !== null);

                                const selectedIndexes = q.options
                                    .map((opt: any, index: number) =>
                                        q.selectedOptionIds.includes(opt.id) ? index : null
                                    )
                                    .filter((v: number | null): v is number => v !== null);

                                return (
                                    <Card key={q.questionId} className="p-4">
                                        <Card.Content>
                                            <div className="mb-3 space-y-1">
                                                <Badge variant="secondary">
                                                    Question #{qIndex + 1}
                                                </Badge>

                                                <h4 className="text-lg font-medium">
                                                    {q.questionText}
                                                    {q.status === "not_attempted" && (
                                                        <span className="ml-2 text-sm text-red-500">
                                                            (Not answered)
                                                        </span>
                                                    )}
                                                </h4>
                                            </div>

                                            {/* OPTIONS */}
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {q.options.map((opt: any, index: number) => (
                                                    <OptionButton
                                                        key={opt.id}
                                                        label={opt.text}
                                                        index={index}
                                                        selected={selectedIndexes.includes(index)}
                                                        result={{
                                                            correctAnswers: correctIndexes,
                                                            selectedAnswers: selectedIndexes,
                                                            status: q.status,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </Card.Content>
                                    </Card>
                                );
                            })}
                        </Card.Content>
                    </Card>
                )}
            </div>
        </div>
    );
}

function getScoreColor(percentage: number) {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
}

function getScoreMessage(percentage: number) {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    return "Keep practicing!";
}