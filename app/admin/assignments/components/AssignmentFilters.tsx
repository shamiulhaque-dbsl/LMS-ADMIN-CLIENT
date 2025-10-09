"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Icons } from "@/components/Icons";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { useAssignmentStore } from "@/admin/assignments/store/assignmentStore";

export default function AssignmentFilter() {
  const { filters, setFilters } = useAssignmentStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    course: filters.course,
    status: filters.status,
  });

  useEffect(() => {
    setLocalFilters({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      course: filters.course,
      status: filters.status,
    });
  }, [filters]);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      ...localFilters,
      page: 1,
    });
  };

  const resetFilters = () => {
    const emptyFilters = {
      dateFrom: "",
      dateTo: "",
      course: "",
      status: "",
    };
    setLocalFilters(emptyFilters);
    setFilters({
      ...emptyFilters,
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

    let from;
    if (days === 0) {
      from = to;
    } else {
      const fromDate = new Date();
      fromDate.setDate(today.getDate() - days);
      from = fromDate.toISOString().split("T")[0];
    }

    const newFilters = {
      ...localFilters,
      dateFrom: from,
      dateTo: to,
    };

    // Update both local state and store
    setLocalFilters(newFilters);
    setFilters({
      ...newFilters,
      page: 1,
    });
  };

  return (
    <Card className="mb-6 rounded-xl bg-white">
      <Card.Header className="mb-0 px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 rounded-xl">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Filters</h2>

          <Button size="sm" variant="outlineGray" type="button" onClick={toggleFilters}>
            <Icons.filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              size="sm"
              variant="outlineGray"
              type="button"
              onClick={() => applyQuickFilter(filter.days)}
              className="text-xs"
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
                <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={localFilters.dateFrom}
                  onChange={handleFilterChange}
                  className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={localFilters.dateTo}
                  onChange={handleFilterChange}
                  className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={localFilters.course}
                  onChange={handleFilterChange}
                  className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={localFilters.status}
                  onChange={handleFilterChange}
                  className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button size="sm" variant="outlineGray" type="button" onClick={resetFilters}>
                Reset
              </Button>
              <Button size="sm" variant="default" type="submit">
                Apply Filters
              </Button>
            </div>
          </form>
        </Card.Content>
      )}
    </Card>
  );
}
