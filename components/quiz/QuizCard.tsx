"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/quiz/Timer";
import { OptionButton } from "@/components/quiz/OptionButton";
import { ProgressBar } from "@/components/quiz/Progressbar";
import { QuizQuestion } from "@/lib/data/quiz-data";
import { ChevronRight, AlertCircle } from "lucide-react";

interface QuizResult {
  questionId: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult[]) => void;
}

export function QuizCard({ questions, onComplete }: QuizCardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizResult[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    // Reset for each new question
    setSelectedOption(null);
    setIsTimerActive(true);
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleTimeUp = () => {
    // Automatically move to next question when time is up
    saveAnswerAndContinue(true);
  };

  const saveAnswerAndContinue = (timeUp: boolean = false) => {
    // Calculate time taken for this question
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    // Create result for current question
    const questionResult: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer: timeUp ? null : selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: !timeUp && selectedOption === currentQuestion.correctAnswer,
      timeTaken: timeTaken,
    };

    // Update answers
    const newAnswers = [...answers, questionResult];
    setAnswers(newAnswers);

    // Move to next question or complete quiz
    if (isLastQuestion) {
      // Ensure all questions are accounted for
      const completeResults = questions.map((question) => {
        // Find the answer for this specific question
        const existingAnswer = newAnswers.find((ans) => ans.questionId === question.id);

        // If no existing answer, create a default result
        return (
          existingAnswer || {
            questionId: question.id,
            selectedAnswer: null,
            correctAnswer: question.correctAnswer,
            isCorrect: false,
            timeTaken: 0,
          }
        );
      });

      onComplete(completeResults);
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <Card className="animate-in fade-in w-full border-t-4 border-t-primary shadow-lg duration-500">
      <Card.Header className="mb-0 p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
          <Timer
            key={currentQuestionIndex} // Force remount for each question
            duration={currentQuestion.timeLimit}
            onTimeUp={handleTimeUp}
            isActive={isTimerActive}
          />
        </div>
      </Card.Header>

      <Card.Content className="p-4">
        <Card.Title className="mb-4 text-base leading-tight md:text-2xl">
          {currentQuestion.question}
        </Card.Title>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              label={option}
              index={index}
              selected={selectedOption === index}
              disabled={!isTimerActive}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
      </Card.Content>

      <Card.Footer className="flex flex-col gap-3 border-t p-6 pt-4 sm:justify-between lg:flex-row ">
        {selectedOption === null ? (
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>Select an answer to continue</span>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Answer selected</div>
        )}

        <Button
          onClick={() => saveAnswerAndContinue()}
          disabled={selectedOption === null}
          variant="default"
          className="lg:ml-auto"
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
          {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </Card.Footer>
    </Card>
  );
}
