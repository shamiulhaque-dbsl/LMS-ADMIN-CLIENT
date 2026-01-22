import { PageHeader } from "@/components/page/PageHeader";
import AssignmentInfo from "@/features/assignment/components/AssignmentInfo";
import ManageAssignment from "@/features/assignment/components/ManageAssignment";

export default function AssignmentPage() {
  return (
    <>
      <PageHeader title="Manage Assignments" />
      <AssignmentInfo />
      <ManageAssignment />
    </>
  );
}
