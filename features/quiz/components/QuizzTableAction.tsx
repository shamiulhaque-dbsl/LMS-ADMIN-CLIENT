"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import type { Quizz } from "../types";
// import { useCourseStore } from "@/dashboard/courses/store/courseStore";
import { Icons } from "@/components/Icons";
import { ROUTES } from "@/constants/routes";

const deleteCourseAPI = async (id: number) => new Promise((res) => setTimeout(res, 500));
const toggleStatusAPI = async (id: number, status: string) =>
  new Promise((res) => setTimeout(res, 500));

interface QuizzTableActionProps {
  quiz: Quizz;
}

export default function QuizzTableAction({ quiz }: QuizzTableActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(quiz.status);

  // const store = useCourseStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCourseAPI(quiz.quizId);
      // store.setFilters({ page: store.filters.page });
    } catch (err) {
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setIsOpen(false);
    }
  };

  // const handleToggleStatus = async () => {
  //   setLoading(true);
  //   try {
  //     await toggleStatusAPI(item.id, status === "active" ? "pending" : "active");
  //     setStatus(status === "active" ? "pending" : "active");
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //     setIsOpen(false);
  //   }
  // };

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
        <DropdownItem onClick={() => setShowConfirm(true)}>Delete</DropdownItem>
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
