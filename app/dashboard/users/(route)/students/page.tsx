import { PageHeader } from "@/components/page/PageHeader";
import ManageUser from "@/features/user/components/ManageUsers";
export default function StudentListPage() {
  return (
    <>
      <PageHeader title="Students" />
      <ManageUser userType="student" />
    </>
  );
}
