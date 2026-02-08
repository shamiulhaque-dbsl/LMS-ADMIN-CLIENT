import { PageHeader } from "@/components/page/PageHeader";
import EnrollmentInfo from "@/features/enrollments/components/EnrollmentInfo";
import ManageEnrollment from "@/features/enrollments/components/ManageEnrollment";

export default function Page() {
  return <>
    <PageHeader title="Manage Enrollments" />
    <EnrollmentInfo />
    <ManageEnrollment />
  </>
}
