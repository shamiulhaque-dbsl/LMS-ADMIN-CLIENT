import { PageHeader } from "@/components/page/PageHeader";
import { ManageCategory } from "@/features/category";

export const revalidate = 30;

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Categories" />
      <ManageCategory />
    </>
  );
}
