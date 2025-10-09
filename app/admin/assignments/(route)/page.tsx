import { PageHeader } from "@/components/page/PageHeader";
import AssignmentInfo from "@/admin/assignments/components/AssignmentInfo";
import ManageAssignment from "@/admin/assignments/components/ManageAssignment";

export default function AssignmentPage() {
  return (
    <>
      <PageHeader title="Manage Assignments" />
      <AssignmentInfo />
      <ManageAssignment />
    </>
  );
}
