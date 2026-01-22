import { PageHeader } from "@/components/page/PageHeader";
import SubmissionTableWrapper from "@/features/assignment/components/submission/SubmissionTableWrapper";
import { use } from "react";

export default function AssignmentSubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <>
      <PageHeader title="Student Assignments" />
      {/* <AssignmentInfo /> */}
      <SubmissionTableWrapper id={id} />
    </>
  );
}
