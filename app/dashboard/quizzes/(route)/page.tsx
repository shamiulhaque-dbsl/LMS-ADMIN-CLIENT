import { PageHeader } from "@/components/page/PageHeader";
import ManageQuizz from "@/dashboard/quizzes/components/ManageQuizz";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Quizzes" />
      <ManageQuizz />
    </>
  );
}
