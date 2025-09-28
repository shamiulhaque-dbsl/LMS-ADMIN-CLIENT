import { cn } from "@/lib/utils/tailwind-utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | string[];
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const errorMessage = Array.isArray(error) ? error.join(", ") : error;

    return (
      <>
        <div className="space-y-1 w-full">
          {label && (
            <label className="block text-sm font-medium text-gray-700" htmlFor={props.name}>
              {label}
            </label>
          )}
          <input
            {...props}
            ref={ref}
            className={cn(
              "h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm",
              error ? "border-[#e74d2e77]" : "border-slate-300",
              className
            )}
          />
        </div>

        {error && (
          <div
            className={`
            mt-1 text-xs font-semibold text-red-500 transition-all duration-300 ease-in-out
            ${error ? "mb-2 max-h-6 opacity-100" : "mb-0 max-h-0 overflow-hidden opacity-0"}
          `}
          >
            {errorMessage}
          </div>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
