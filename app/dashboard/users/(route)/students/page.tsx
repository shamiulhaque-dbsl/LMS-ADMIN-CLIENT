import { PageHeader } from "@/components/page/PageHeader";
import ManageStudent from "@/features/user/components/ManageStudents";

export default function StudentListPage() {
  return (
    <>
      <PageHeader title="Students" />
      <ManageStudent />
    </>
  );
}
