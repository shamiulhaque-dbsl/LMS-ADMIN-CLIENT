"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/tailwind-utils";
import { Icons } from "@/components/Icons";

interface OptionButtonProps {
  label: string;
  index: number;
  selected?: boolean;
  disabled?: boolean;
  isCorrect?: boolean;
  result?: {
    isCorrect: boolean;
    correctAnswer: number;
    selectedAnswer: number | null;
  };
  onSelect?: (index: number) => void;
}

export function OptionButton({
  label,
  index,
  selected,
  disabled,
  result,
  onSelect,
}: OptionButtonProps) {
  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <Button
      variant={selected ? "default" : "outlineGray"}
      className={cn(
        "w-full justify-start text-left h-auto py-4 px-3 sm:px-6 transition-all",
        selected && "ring-2 ring-primary ring-offset-2",
        !disabled && !selected && "hover:bg-secondary hover:text-secondary-foreground"
      )}
      disabled={disabled}
      onClick={() => onSelect?.(index)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex-none flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
              selected ? "bg-primary-foreground text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            {letters[index]}
          </div>
          <span className="text-xs sm:text-base">{label}</span>
        </div>
        <div>
          {result?.isCorrect && result.correctAnswer === result.selectedAnswer && (
            <Icons.checkcircle size={18} className="text-green-500" />
          )}

          {!result?.isCorrect && result?.selectedAnswer && (
            <Icons.circlex size={18} className="text-red-500" />
          )}
        </div>
      </div>
    </Button>
  );
}
