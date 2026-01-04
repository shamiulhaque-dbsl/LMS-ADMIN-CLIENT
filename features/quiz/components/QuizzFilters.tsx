"use client";

import type React from "react";
import { useState, useEffect, useTransition } from "react";
import { Icons } from "@/components/Icons";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { useQuizzStore } from "@/dashboard/quizzes/store/quizzStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface QuizzFiltersProps {
  currentFilters: {
    dateFrom?: string;
    dateTo?: string;
    course?: string;
    instructor?: string;
    status?: string;
    page?: number;
  };
}

export default function QuizzFilters({ currentFilters }: QuizzFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();

    // Build URL params
    const params = new URLSearchParams();
    if (localFilters?.dateFrom) params.set("dateFrom", localFilters?.dateFrom);
    if (localFilters?.dateTo) params.set("dateTo", localFilters?.dateTo);
    if (localFilters?.course) params.set("course", localFilters?.course);
    if (localFilters?.instructor) params.set("instructor", localFilters?.instructor);
    if (localFilters?.status) params.set("status", localFilters?.status);

    // Reset to page 1
    params.set("page", "1");

    // Use transition for better UX
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      router.push(pathname);
    });
    setLocalFilters({
      dateFrom: "",
      dateTo: "",
      course: "",
      instructor: "",
      status: "",
      page: 1,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const quickFilters = [
    { label: "Today", days: 0 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
  ];

  const applyQuickFilter = (days: number) => {
    const today = new Date();
    const to = today.toISOString().split("T")[0];
    const from =
      days === 0 ? to : new Date(today.setDate(today.getDate() - days)).toISOString().split("T")[0];

    const params = new URLSearchParams();
    params.set("dateFrom", from);
    params.set("dateTo", to);
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Card className="mb-6 rounded-xl bg-white">
      <Card.Header className="mb-0 flex flex-col gap-5 rounded-xl border-b border-gray-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Filters</h2>

          <Button size="sm" variant="outlineGray" type="button" onClick={toggleFilters}>
            <Icons.filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <Button
              key={filter.days}
              size="sm"
              variant="outlineGray"
              type="button"
              onClick={() => applyQuickFilter(filter.days)}
              className="text-xs"
              disabled={isPending}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </Card.Header>

      {isOpen && (
        <Card.Content className="px-4 py-5 sm:p-6">
          <form onSubmit={applyFilters}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="mb-4">
                <label htmlFor="dateFrom" className="mb-1 block text-sm font-medium text-gray-700">
                  Date From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={localFilters.dateFrom}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dateTo" className="mb-1 block text-sm font-medium text-gray-700">
                  Date To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={localFilters.dateTo}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="course" className="mb-1 block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={localFilters.course}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All Courses</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="instructor"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Instructor
                </label>
                <select
                  id="instructor"
                  name="instructor"
                  value={localFilters.instructor}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All Instructors</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Robert Johnson">Robert Johnson</option>
                  <option value="Emily Brown">Emily Brown</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={localFilters.status}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outlineGray"
                type="button"
                onClick={resetFilters}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button size="sm" variant="default" type="submit" disabled={isPending}>
                {isPending ? "Applying..." : "Apply Filters"}
              </Button>
            </div>
          </form>
        </Card.Content>
      )}
    </Card>
  );
}
