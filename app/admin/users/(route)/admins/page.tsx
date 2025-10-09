import { PageHeader } from "@/components/page/PageHeader";
import ManageUser from "@/admin/users/components/ManageUsers";
export default function AdminListPage() {
  return (
    <>
      <PageHeader title="Admins" />
      <ManageUser userType="admin" />
    </>
  );
}
