"use client";

import { Card } from "@/components/ui/Card";
import { QuizQuestion } from "@/lib/data/quiz-data";
import { BarChart3 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { OptionButton } from "./OptionButton";
interface ResultsCardProps {
  questions: QuizQuestion[];
  answers: {
    questionId: number;
    selectedAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    timeTaken: number;
  }[];
}

export function ResultsCard({ questions, answers }: ResultsCardProps) {
  const correctAnswers = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question && answer.selectedAnswer === question.correctAnswer;
  }).length;

  const score = Math.round((correctAnswers / questions.length) * 100);
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Excellent work!";
    if (score >= 60) return "Good job!";
    return "Keep practicing!";
  };

  return (
    <Card className="animate-in fade-in w-full shadow-lg duration-500">
      <Card.Header className="mb-0 p-4 sm:p-6">
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Your Score</h3>
          </div>
          <p className={`text-4xl font-bold ${getScoreColor()}`}>{score}%</p>
          <p className="mt-1 text-muted-foreground">{getScoreMessage()}</p>
          <p className="mt-2">
            {correctAnswers} correct out of {questions.length} questions
          </p>
        </div>
      </Card.Header>
      <Card.Content className="p-6">
        <div className="mt-8 space-y-4">
          <h3 className="border-b pb-2 text-lg font-medium">Question Summary</h3>
          {answers.map((answer, index) => {
            const question = questions.find((q) => q.id === answer.questionId)!;
            const result = {
              questionId: answer.questionId,
              isCorrect: answer.isCorrect,
              correctAnswer: answer.correctAnswer,
              selectedAnswer: answer.selectedAnswer,
            };

            return (
              <Card key={index} className="p-4">
                <Card.Content>
                  <div className="mb-3 space-y-1">
                    <Badge variant="secondary">Question #{answer.questionId}</Badge>
                    <Card.Title className="text-lg">
                      {question.question}
                      {answer?.selectedAnswer === null ? (
                        <span className="text-sm text-red-500">(No answer selected)</span>
                      ) : (
                        ""
                      )}
                    </Card.Title>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {question.options.map((option, index) => (
                      <OptionButton
                        key={index}
                        label={option}
                        index={index}
                        selected={answer.selectedAnswer === index}
                        result={result}
                      />
                    ))}
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}
