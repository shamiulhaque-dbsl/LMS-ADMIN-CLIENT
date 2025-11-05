import { PageHeader } from "@/components/page/PageHeader";
import CourseInfo from "@/dashboard/courses/components/CourseInfo";
import ManageCourse from "@/dashboard/courses/components/ManageCourse";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Courses" />
      <CourseInfo />
      <ManageCourse />
    </>
  );
}
