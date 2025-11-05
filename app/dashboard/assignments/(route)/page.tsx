import { PageHeader } from "@/components/page/PageHeader";
import AssignmentInfo from "@/dashboard/assignments/components/AssignmentInfo";
import ManageAssignment from "@/dashboard/assignments/components/ManageAssignment";

export default function AssignmentPage() {
  return (
    <>
      <PageHeader title="Manage Assignments" />
      <AssignmentInfo />
      <ManageAssignment />
    </>
  );
}
