import { Button } from "@/components/ui/Button";

export const SubmitForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: () => void;
  isSubmitting: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-2xl font-semibold">Thank You</p>
      <span className="text-sm text-gray-600 text-center">
        You are just one click away from creating a course
      </span>
      <Button
        variant="default"
        size="sm"
        className="mt-4"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

SubmitForm.displayName = "SubmitForm";
