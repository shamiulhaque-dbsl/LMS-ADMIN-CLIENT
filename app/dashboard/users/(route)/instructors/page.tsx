import { PageHeader } from "@/components/page/PageHeader";
import ManageUser from "@/features/user/components/ManageUsers";
export default function InstructorListPage() {
  return (
    <>
      <PageHeader title="Instructors" />
      <ManageUser userType="instructor" />
    </>
  );
}
