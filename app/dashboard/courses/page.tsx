import { PageHeader } from "@/components/page/PageHeader";
import { CourseInfo, ManageCourse } from "@/features/course";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Courses" />
      <CourseInfo />
      <ManageCourse />
    </>
  );
}
