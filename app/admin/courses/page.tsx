import { PageHeader } from "@/components/page/PageHeader";
import CourseInfo from "@/admin/courses/components/CourseInfo";
import ManageCourse from "@/admin/courses/components/ManageCourse";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Courses" />
      <CourseInfo />
      <ManageCourse />
    </>
  );
}
