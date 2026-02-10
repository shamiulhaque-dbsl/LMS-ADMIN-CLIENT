"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
// import { useCourseStore } from "@/dashboard/courses/store/courseStore";
import { Icons } from "@/components/Icons";
import { deleteUser } from "@/api/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ActionTableProps {
  userId: number;
}

export default function ActionTable({ userId }: ActionTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [status, setStatus] = useState("active");
  const router = useRouter();
  // const store = useCourseStore();

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      const user = await deleteUser(id);
      if (user?.status === "success") {
        toast.success(user?.message || "Delete Successfull")
        setShowConfirm(false);
        router.refresh();
      } else {
        toast.error(user?.message || "Failed to delete user")
      }

    } catch (error: any) {
      toast.error(error?.message || "Failed to delete user")
    } finally {
      setLoading(false);
    }

  };

  // const handleToggleStatus = async () => { };

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
        <DropdownItem href={`/dashboard/users/edit/${userId}`}>Edit</DropdownItem>
        <DropdownItem onClick={() => setShowConfirm(true)}>Delete</DropdownItem>
        {/* <DropdownItem onClick={handleToggleStatus}>
          {status === "active" ? "Deactivate" : "Activate"}
        </DropdownItem> */}
      </Dropdown>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 text-center shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this course?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                disabled={loading}
                onClick={() => handleDelete(userId)}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
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
