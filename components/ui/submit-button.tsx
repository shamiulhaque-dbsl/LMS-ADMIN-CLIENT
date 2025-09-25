"use client";

import { Button } from "@/components/ui/Button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  loadingText?: string;
  idleText?: string;
}
export function SubmitButton({
  loadingText = "Submitting...",
  idleText = "Submit",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" size="md" className="w-full">
      {pending ? loadingText : idleText}
    </Button>
  );
}
