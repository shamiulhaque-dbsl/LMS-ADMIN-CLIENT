"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { Icons } from "@/components/Icons";
import { Category } from "@/features/category/types";
import { useConfirmDialog } from "@/stores/confirmDialog";
import { useCategoryAction } from "@/features/category/hooks/useCategoryAction";
export default function CategoryTableAction({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useConfirmDialog();
  const { removeCategory } = useCategoryAction();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await removeCategory(category.id);
      if (res && !res.success) {
        throw new Error(res?.message);
      }
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
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
        <DropdownItem href={`/dashboard/courses/categories/${category.id}/edit`}>Edit</DropdownItem>
        <DropdownItem
          onClick={() =>
            openDialog({
              title: "Delete Category",
              message: `Are you sure you want to delete "${category.name}"?`,
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
