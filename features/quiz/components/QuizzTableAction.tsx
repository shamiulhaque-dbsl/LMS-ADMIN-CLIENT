"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import type { Quizz } from "../types";
import { Icons } from "@/components/Icons";
import { ROUTES } from "@/constants/routes";
import { useConfirmDialog } from "@/stores/confirmDialog";
import { useRouter } from "next/navigation";
import { useCreateQuiz } from "../hooks/useCreateQuiz";

interface QuizzTableActionProps {
  quiz: Quizz;
}

export default function QuizzTableAction({ quiz }: QuizzTableActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useConfirmDialog();
  const { removeQuizz } = useCreateQuiz();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await removeQuizz(quiz.quizId);
      if (res && !res.success) {
        throw new Error(res?.message);
      }
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Quiz");
    }
  };

  return (
    <>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-secondary p-1">
            <Icons.ellipsis className="text-gray-700" />
          </button>
        }
        className="w-52 space-y-2 rounded-md py-4 leading-tight"
        align="right"
      >
        <DropdownItem href={ROUTES.QUIZZES.RESULT(quiz.quizId)}>View Quiz Result</DropdownItem>
        <DropdownItem href={ROUTES.QUIZZES.EDIT(quiz.quizId)}>Edit</DropdownItem>
        <DropdownItem
          onClick={() =>
            openDialog({
              title: "Delete Category",
              message: `Are you sure you want to delete "${quiz.title}"?`,
              confirmText: "Yes, Delete",
              cancelText: "Cancel",
              onConfirm: handleDelete,
            })
          }
        >
          Delete
        </DropdownItem>
      </Dropdown>
    </>
  );
}
