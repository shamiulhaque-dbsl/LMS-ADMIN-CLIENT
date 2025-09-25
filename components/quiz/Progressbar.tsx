interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
