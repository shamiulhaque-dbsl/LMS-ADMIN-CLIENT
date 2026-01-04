import { PageHeader } from "@/components/page/PageHeader";
import ManageQuizCreate from "@/features/quiz/ManageQuizCreate";

export default function QuizzCreatePage() {
  return (
    <>
      <PageHeader title="Add new Quizz" />
      <ManageQuizCreate />
    </>
  );
}
