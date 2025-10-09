import { PageHeader } from "@/components/page/PageHeader";
import { QuizzForm } from "@/admin/quizzes/components/QuizzForm";
import { Card } from "@/components/ui/Card";

export default function QuizzCreatePage() {
  return (
    <>
      <PageHeader title="Add new Quizz" />
      <Card className="bg-white p-6">
        <Card.Content className="max-w-xl">
          <QuizzForm />
        </Card.Content>
      </Card>
    </>
  );
}
