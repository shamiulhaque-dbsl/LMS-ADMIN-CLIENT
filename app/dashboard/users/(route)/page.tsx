import { PageHeader } from "@/components/page/PageHeader";
import ManageUser from "@/dashboard/users/components/ManageUsers";
/*
  # ToDo:
  - Add user filters option
*/
export default function AdminListPage() {
  return (
    <>
      <PageHeader title="All Users (Admin & Instructors)" />
      <ManageUser showAllUsers={true} />
    </>
  );
}
