import { PageHeader } from "@/components/page/PageHeader";
import { ManageCourseEdit } from "@/features/course";
export default function Page() {
  return (
    <>
      <PageHeader title="Update Course" />
      <ManageCourseEdit />
    </>
  );
}
