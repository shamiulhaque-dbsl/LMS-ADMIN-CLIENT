import { PageHeader } from "@/components/page/PageHeader";
import ManageCategory from "@/features/category/ManageCategory";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Categories" />
      <ManageCategory />
    </>
  );
}
