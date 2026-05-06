"use client";

import React, { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  error?: string;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      required,
      className = "",
      labelClassName = "",
      textareaClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className={`label-base ${labelClassName}`}>
            {label}
            {required && <span className="required-star">*</span>}{" "}
          </label>
        )}
        <textarea
          ref={ref}

          className={`input-base ${textareaClassName} ${error ? "input-error" : ""}`}
          {...props}
        />
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
