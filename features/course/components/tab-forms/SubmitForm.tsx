import React from "react";
import { useFormContext } from "react-hook-form";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { ErrorSummary } from "@/features/course/components/ErrorSummary";
import { Button } from "@/components/ui/Button";

type Props = {
  onSubmit: () => void;
  isSubmitting: boolean;
};

export const SubmitForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const resetForm = useCourseFormStore((s) => s.resetForm);

  const flattenErrors = (errObj: any, prefix = ""): Record<string, string> => {
    const out: Record<string, string> = {};
    Object.entries(errObj || {}).forEach(([k, v]) => {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && "message" in v) {
        out[path] = (v as any).message as string;
      } else if (v && typeof v === "object") {
        Object.assign(out, flattenErrors(v, path));
      }
    });
    return out;
  };

  const formErrorsFlat = flattenErrors(errors as any);
  const allErrors = { ...formErrorsFlat };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-semibold">Thank You</p>
        <span className="text-center text-sm text-gray-600">
          You are just one click away from creating a course
        </span>
        {Object.keys(allErrors).length > 0 && <ErrorSummary errors={allErrors} />}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outlineGray"
            size="sm"
            className="mt-4"
            onClick={() => {
              resetForm();
            }}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            className="mt-4"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
