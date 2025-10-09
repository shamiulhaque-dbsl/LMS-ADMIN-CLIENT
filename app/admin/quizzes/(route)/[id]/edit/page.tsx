import { PageHeader } from "@/components/page/PageHeader";
import { Card } from "@/components/ui/Card";
import ManageQuizzEdit from "@/app/admin/quizzes/components/edit/ManageQuizzEdit";

export default function QuizzCreatePage() {
  return (
    <>
      <PageHeader title="Edit Quizz" />
      <Card className="bg-white p-6">
        <Card.Content>
          <ManageQuizzEdit />
        </Card.Content>
      </Card>
    </>
  );
}
