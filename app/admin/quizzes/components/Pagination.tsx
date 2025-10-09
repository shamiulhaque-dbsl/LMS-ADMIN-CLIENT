"use client";

import { Icons } from "@/components/Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    // Here you would typically update your state with the new limit
    // and reset to page 1
    // setLimit(newLimit);
    // onPageChange(1);
  };

  // Default items per page
  const currentLimit = 10;

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    // Previous page button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center px-2 py-2 text-sm font-medium rounded-md mr-1 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        aria-label="Previous page"
      >
        <Icons.chevronLeft className="h-4 w-4" />
      </button>
    );

    // Calculate range of visible page numbers
    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
      // If we have less pages than we want to show, display all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // We have more pages than we want to display
      let maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Current page is close to the start
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Current page is close to the end
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        // Current page is somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Add ellipsis and first page if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1
                    border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Add the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1
                    ${
                      i === currentPage
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1
                    border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    // Next page button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center px-2 py-2 text-sm font-medium rounded-md ml-1
                 disabled:opacity-50 disabled:cursor-not-allowed
                 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        aria-label="Next page"
      >
        <Icons.chevronRight className="h-4 w-4" />
      </button>
    );

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show</span>
        <select
          value={currentLimit}
          onChange={handleLimitChange}
          className="border border-gray-300 rounded-md text-sm p-1"
          aria-label="Records per page"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span className="text-sm text-gray-600">per page</span>
      </div>

      <div className="flex items-center justify-center overflow-x-auto py-2">
        {totalPages > 1 && renderPageNumbers()}
      </div>

      <div className="text-sm text-gray-600">
        Showing{" "}
        {totalRecords > 0 ? Math.min((currentPage - 1) * currentLimit + 1, totalRecords) : 0} -{" "}
        {Math.min(currentPage * currentLimit, totalRecords)} of {totalRecords} records
      </div>
    </div>
  );
}
