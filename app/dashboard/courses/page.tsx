import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PageHeader } from "@/components/page/PageHeader";
import { CourseInfo, ManageCourse, CourseInfoSkeleton } from "@/features/course";
import { getCourseMetric } from "@/api/course";
import type { CourseMetricResponse } from "@/features/course/types";
import { ErrorMessage } from "@/components/ErrorMessage";

export const revalidate = 0;

const fetchCourseMetrics = async (): Promise<CourseMetricResponse | null> => {
  const res = await getCourseMetric();
  return res?.data ?? null;
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Courses" />

      <ErrorBoundary
        fallback={
          <div className="mb-4">
            <ErrorMessage message="Failed to load course metrics" />
          </div>
        }
      >
        <Suspense fallback={<CourseInfoSkeleton />}>
          <CourseInfo fetchCourseMetrics={fetchCourseMetrics} />
        </Suspense>
      </ErrorBoundary>

      <ManageCourse />
    </>
  );
}
