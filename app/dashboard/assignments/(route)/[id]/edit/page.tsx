import { PageHeader } from "@/components/page/PageHeader";
import ManageAssignmentEdit from "@/features/assignment/components/ManageAssignmentEdit";

export default function AssignmentEditPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <PageHeader title="Edit Assignment" />
      <ManageAssignmentEdit id={id || ""} />
    </>
  );
}
