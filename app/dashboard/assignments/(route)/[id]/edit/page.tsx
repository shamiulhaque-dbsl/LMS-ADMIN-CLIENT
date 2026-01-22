import { PageHeader } from "@/components/page/PageHeader";
import ManageAssignmentEdit from "@/features/assignment/components/ManageAssignmentEdit";
import { use } from "react";

export default function AssignmentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <>
      <PageHeader title="Edit Assignment" />
      <ManageAssignmentEdit id={id} />
    </>
  );
}
