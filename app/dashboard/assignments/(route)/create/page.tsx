import { PageHeader } from "@/components/page/PageHeader";
import ManageAssignmentCreate from "@/features/assignment/components/ManageAssignmentCreate";

export default function AssignmentCreatePage() {
  return (
    <>
      <PageHeader title="Add new Assignment" />
      <ManageAssignmentCreate />
    </>
  );
}
