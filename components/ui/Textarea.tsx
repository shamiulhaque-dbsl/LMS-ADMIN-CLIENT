"use client";

import React, { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, className = "", labelClassName = "", textareaClassName = "", ...props },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`border rounded-md p-2 focus:outline-none  focus:border-[#e74d2e77] focus:ring-[#e74c2e] text-sm ${textareaClassName} ${
            error ? "border-red-500" : "border-slate-300"
          }`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
