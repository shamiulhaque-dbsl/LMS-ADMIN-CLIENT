import { PageHeader } from "@/components/page/PageHeader";
import ManageCourseCategory from "@/admin/courses/components/category/ManageCategory";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Categories" />
      <ManageCourseCategory />
    </>
  );
}
