import { PageHeader } from "@/components/page/PageHeader";
import ManageQuizz from "@/app/admin/quizzes/components/ManageQuizz";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Quizzes" />
      <ManageQuizz />
    </>
  );
}
