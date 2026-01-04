import { PageHeader } from "@/components/page/PageHeader";
import { Card } from "@/components/ui/Card";
import ManageQuizzEdit from "@/features/quiz/ManageQuizzEdit";
import { notFound } from "next/navigation";
import { use } from "react";

type QuizEditPageProps = {
  params: Promise<{ id: number }>;
};

export default function QuizzCreatePage({ params }: QuizEditPageProps) {
  const { id } = use(params);
  if (isNaN(id as number)) {
    notFound();
  }

  return (
    <>
      <PageHeader title="Edit Quizz" />
      <Card className="bg-white p-6">
        <Card.Content>
          <ManageQuizzEdit quizId={id} />
        </Card.Content>
      </Card>
    </>
  );
}
