import { PageHeader } from "@/components/page/PageHeader";
import ManageQuizz from "@/features/quiz/ManageQuizz";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Manage Quizzes" />
      <ManageQuizz />
    </>
  );
}
