import { PageHeader } from "@/components/page/PageHeader";
import ManageUser from "@/features/user/components/ManageUsers";
export default function AdminListPage() {
  return (
    <>
      <PageHeader title="Admins" />
      <ManageUser userType="admin" />
    </>
  );
}
