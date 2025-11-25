"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import type { Course } from "@/features/course/types";
import { useConfirmDialog } from "@/stores/confirmDialog";
import { useCourseAction } from "@/features/course/hooks/useCourseAction";

/*
  # TODO:
  1. Add more actions as needed.
*/
export default function CourseTableAction({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useConfirmDialog();
  const { remove } = useCourseAction();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await remove(course.id);
      if (res && !res.success) {
        throw new Error(res?.message);
      }
      toast.success("Course deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete the course");
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
        <DropdownItem href={`/dashboard/courses/${course.id}/edit`}>Edit course</DropdownItem>
        <DropdownItem
          onClick={() =>
            openDialog({
              title: "Delete Category",
              message: `Are you sure you want to delete "${course.title}"?`,
              confirmText: "Yes, Delete",
              cancelText: "Cancel",
              onConfirm: handleDelete,
            })
          }
        >
          Delete
        </DropdownItem>
        {/* <DropdownItem href={`/dashboard/courses/${course.id}/details`}>View course</DropdownItem>
        <DropdownItem href={`/dashboard/courses/${course.id}/details`}>
          Section & lesson
        </DropdownItem>
        <DropdownItem href="#">View course on frontend</DropdownItem> */}
        {/* <DropdownItem href={`/courses/${item.id}/play`}>Go to course playing page</DropdownItem> */}
        {/* <DropdownItem href={`/dashboard/courses/${item.id}`}>Academic progress</DropdownItem> */}
        {/* <DropdownItem>Send Email</DropdownItem>
        <DropdownItem>Send SMS</DropdownItem> */}
      </Dropdown>
    </>
  );
}
