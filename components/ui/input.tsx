import { cn } from "@/lib/utils/tailwind-utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | string[];
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, required, ...props }, ref) => {
    const errorMessage = Array.isArray(error) ? error.join(", ") : error;

    return (
      <>
        <div className="flex-1">
          {label && (
            <label className="label-base" htmlFor={props.id}>
              {label}
              {required && <span className="required-star">*</span>}
            </label>
          )}
          <input
            {...props}
            ref={ref}
            className={cn("input-base", error ? "input-error" : "", className)}
          />
        </div>

        {error && (
          <div
            className={`
            "error-text",
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
