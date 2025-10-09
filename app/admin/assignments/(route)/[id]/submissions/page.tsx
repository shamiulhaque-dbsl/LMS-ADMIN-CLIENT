import { PageHeader } from "@/components/page/PageHeader";
import AssignmentInfo from "@/admin/assignments/components/AssignmentInfo";
import ManageAssignment from "@/admin/assignments/components/ManageAssignment";

/*
  # TODO:
  - Add assignment submission table
  - Assignment Info show base on assignment related data like pending review, passed, failed
  - Assignment submission filter include student wise filter
  - Finally in submission table show sibmission related data like attempts, mark, status(pass or fail)
*/
export default function AssignmentSubmissionPage() {
  return (
    <>
      <PageHeader title="Student Assignments" />
      <AssignmentInfo />
      <ManageAssignment />
    </>
  );
}
