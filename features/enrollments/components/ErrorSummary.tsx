import { Icons } from "@/components/Icons";
import { memo } from "react";

export const ErrorSummary = memo(({ errors }: { errors: Record<string, string> }) => (
  <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
    <div className="flex items-start gap-3">
      <Icons.alert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
      <div className="flex-1">
        <h4 className="mb-2 font-semibold text-red-900">Please fix the following errors:</h4>
        <ul className="space-y-1 text-sm text-red-700">
          {Object.entries(errors).map(([field, error]) => (
            <li key={field} className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">•</span>
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
