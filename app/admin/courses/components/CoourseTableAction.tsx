"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { useCourseStore } from "@/admin/courses/store/courseStore";
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
  const [showEditModal, setShowEditModal] = useState(false);
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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-white hover:text-gray-900 rounded-full bg-web-primary"
          >
            <Icons.ellipsis />
          </button>
        }
        className="w-52 leading-tight rounded-md space-y-2 py-4"
        align="right"
      >
        <DropdownItem onClick={() => setShowEditModal(true)}>View course on frontend</DropdownItem>
        <DropdownItem onClick={() => setShowConfirm(true)}>Go to course playing page</DropdownItem>
        <DropdownItem href={`/admin/courses/${item.id}`}>Academic progress</DropdownItem>
        <DropdownItem href={`/admin/courses/${item.id}/lessons`}>Edit course</DropdownItem>
        <DropdownItem href={`/admin/courses/${item.id}/lessons`}>Section & lesson</DropdownItem>
        <DropdownItem href={`/admin/courses/${item.id}/lessons`}>Delete</DropdownItem>
        <DropdownItem onClick={handleToggleStatus}>
          {status === "active" ? "Deactivate" : "Activate"}
        </DropdownItem>
        <DropdownItem>Send Email</DropdownItem>
        <DropdownItem>Send SMS</DropdownItem>
      </Dropdown>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Edit Course: {item.title}</h2>
            <p className="mb-4">Edit form goes here...</p>
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this course?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
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
