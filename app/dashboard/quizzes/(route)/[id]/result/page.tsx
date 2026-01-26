import { PageHeader } from "@/components/page/PageHeader";
import ManageResult from "@/features/quiz/ManageResult";

export default function QuizResultPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <PageHeader title="Quiz Submission Result" />
      <ManageResult params={params} />
    </>
  );
}
