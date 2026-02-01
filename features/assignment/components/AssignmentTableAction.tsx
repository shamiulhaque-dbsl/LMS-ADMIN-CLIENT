"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { Icons } from "@/components/Icons";
import { Assignment } from "../types/type-matric";
import { deleteAssignment } from "@/api/assignment";
import { toast } from "sonner";

interface AssignmentTableActionProps {
  item: Assignment;
  onDelete?: (id: number) => void;
}

export default function AssignmentTableAction({ item, onDelete }: AssignmentTableActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const id = item?.assignmentId;

    if (!id) {
      toast.error("Assignment ID not found");
      setLoading(false);
      return;
    }

    try {
      const result = await deleteAssignment(id);
      if (result?.success) {
        toast.success("Assignment deleted successfully");
        if (onDelete) {
          onDelete(id);
        }
      } else {
        toast.error(result?.message || "Failed to delete assignment");
      }
    } catch {
      toast.error("Failed to delete assignment. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setIsOpen(false);
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
        <DropdownItem href={`/dashboard/assignments/${item.assignmentId}/submissions`}>
          View Submission
        </DropdownItem>
        <DropdownItem href={`/dashboard/assignments/${item.assignmentId}/edit`}>Edit</DropdownItem>
        <DropdownItem onClick={() => setShowConfirm(true)}>Delete</DropdownItem>
      </Dropdown>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 text-center shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this assignment?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
