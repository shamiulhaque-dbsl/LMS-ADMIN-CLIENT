import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorclassname?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200/40 ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-[#0f172a] transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };
