"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { useCourseStore } from "@/features/course/stores/courseStore";
import { Icons } from "@/components/Icons";

const deleteCourseAPI = async (id: number) => new Promise((res) => setTimeout(res, 500));
const toggleStatusAPI = async (id: number, status: string) =>
  new Promise((res) => setTimeout(res, 500));

interface Course {
  id: number;
  title: string;
  category: string;
  lessons: number;
  sections: number;
  price: string;
  sales: number;
  students: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface CourseTableActionProps {
  item: Course;
}

export default function CourseTableAction({ item }: CourseTableActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(item.status);

  const store = useCourseStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCourseAPI(item.id);
      store.setFilters({ page: store.filters.page });
    } catch (err) {
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setIsOpen(false);
    }
  };

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await toggleStatusAPI(item.id, status === "active" ? "pending" : "active");
      setStatus(status === "active" ? "pending" : "active");
    } catch (err) {
    } finally {
      setLoading(false);
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
        <DropdownItem href={`/courses/${item.id}`}>View course on frontend</DropdownItem>
        <DropdownItem href={`/courses/${item.id}/play`}>Go to course playing page</DropdownItem>
        <DropdownItem href={`/dashboard/courses/${item.id}`}>Academic progress</DropdownItem>
        <DropdownItem href={`/dashboard/courses/${item.id}/edit`}>Edit course</DropdownItem>
        <DropdownItem href={`/dashboard/courses/${item.id}/details`}>View course</DropdownItem>
        <DropdownItem href={`/dashboard/courses/${item.id}/details`}>Section & lesson</DropdownItem>
        <DropdownItem onClick={() => setShowConfirm(true)}>Delete</DropdownItem>
        <DropdownItem onClick={handleToggleStatus}>
          {status === "active" ? "Deactivate" : "Activate"}
        </DropdownItem>
        <DropdownItem>Send Email</DropdownItem>
        <DropdownItem>Send SMS</DropdownItem>
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
                onClick={handleDelete}
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
