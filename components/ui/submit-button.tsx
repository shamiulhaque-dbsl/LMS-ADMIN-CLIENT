"use client";

import { Button } from "@/components/ui/Button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  loadingText?: string;
  idleText?: string;
  disabled?: boolean;
}
export function SubmitButton({
  loadingText = "Submitting...",
  idleText = "Submit",
  disabled = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" size="md" className="w-full" disabled={disabled || pending}>
      {pending ? loadingText : idleText}
    </Button>
  );
}
