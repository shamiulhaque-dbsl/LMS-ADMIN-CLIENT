"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/tailwind-utils";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Reset timer when duration or active state changes
    setTimeLeft(duration);
    startTimeRef.current = Date.now();

    // Stop any existing timer
    stopTimer();

    // Start new timer if active
    if (isActive) {
      timerRef.current = setInterval(() => {
        const elapsedTime = Math.round((Date.now() - startTimeRef.current) / 1000);
        const remainingTime = Math.max(duration - elapsedTime, 0);

        setTimeLeft(remainingTime);

        // Check if time is up
        if (remainingTime <= 0) {
          stopTimer();
          onTimeUp();
        }
      }, 1000);
    }

    // Cleanup function
    return () => {
      stopTimer();
    };
  }, [duration, onTimeUp, isActive]);

  return (
    <div className="w-full">
      <span
        className={cn(
          "text-sm font-bold",
          timeLeft <= 30 && "text-red-500 animate-pulse",
          timeLeft > 30 && timeLeft <= 60 && "text-yellow-600",
          timeLeft > 60 && "text-green-600"
        )}
      >
        {timeLeft} seconds
      </span>
    </div>
  );
}
