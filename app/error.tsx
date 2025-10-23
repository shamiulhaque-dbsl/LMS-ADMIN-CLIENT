"use client";

import { useEffect } from "react";

export default function DashboardErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-3 text-xl font-semibold text-red-600">Error loading dashboard content</h3>
      <button
        onClick={reset}
        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
