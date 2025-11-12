import { AlertCircle, LucideIcon } from "lucide-react";
import { FC } from "react";
import clsx from "clsx";

type ErrorMessageProps = {
  /** Optional icon (defaults to AlertCircle) */
  icon?: LucideIcon;
  /** Optional title (e.g., “Error Occurred”) */
  title?: string;
  /** Description for detailed error message */
  description?: string;
  /** Simple message (used for alert type) */
  message?: string;
  /** Additional custom classes */
  className?: string;
};

/**
 * ErrorMessage component — a flexible alert-style error display.
 * Can be used as:
 *  - simple inline error (message only)
 *  - full error card (icon, title, description)
 */
export const ErrorMessage: FC<ErrorMessageProps> = ({
  icon: Icon = AlertCircle,
  title = "Error Occurred",
  description = "Something went wrong. Please try again.",
  message,
  className,
}) => {
  // If only `message` is provided (simple alert mode)
  if (message && !title && !description) {
    return <p className={clsx("text-red-500 text-sm mt-1", className)}>{message}</p>;
  }

  // Full error card (with icon, title, and/or description)
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-red-300 bg-red-50 p-6 text-center",
        className
      )}
    >
      {Icon && <Icon className="h-10 w-10 text-red-500" />}
      <div>
        {title && <p className="text-lg font-semibold text-red-600">{title}</p>}
        {description && <p className="text-sm text-red-500 mt-1">{description}</p>}
      </div>
    </div>
  );
};

ErrorMessage.displayName = "ErrorMessage";
