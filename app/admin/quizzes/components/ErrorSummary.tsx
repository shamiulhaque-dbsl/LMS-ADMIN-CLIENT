import { Icons } from "@/components/Icons";
import { memo } from "react";

export const ErrorSummary = memo(({ errors }: { errors: Record<string, string> }) => (
  <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-start gap-3">
      <Icons.alert className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-900 mb-2">Please fix the following errors:</h4>
        <ul className="text-sm text-red-700 space-y-1">
          {Object.entries(errors).map(([field, error]) => (
            <li key={field} className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>
                <span className="font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}:
                </span>{" "}
                {error}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));

ErrorSummary.displayName = "CourseErrorSummary";
