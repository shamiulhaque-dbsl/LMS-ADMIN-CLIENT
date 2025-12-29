import { ErrorMessage } from "@/components/ErrorMessage";
import { PageHeader } from "@/components/page/PageHeader";
import { Card } from "@/components/ui/Card";
import ManageQuizzEdit from "@/features/quiz/ManageQuizzEdit";
import { use } from "react";

type QuizEditPageProps = {
  params: Promise<{ id: string }>;
};

export default function QuizzCreatePage({ params }: QuizEditPageProps) {
  const { id } = use(params);
  if (!id) return <ErrorMessage message="Missing quiz ID" />;

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
