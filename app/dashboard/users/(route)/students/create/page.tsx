import { PageHeader } from "@/components/page/PageHeader";
import { Card } from "@/components/ui/Card";
import { StudentForm } from "@/features/user/components/StudentForm";

export default function StudentCreatePage() {
  return (
    <>
      <PageHeader title="Add new Student" />
      <Card className="bg-white p-6">
        <Card.Content className="max-w-5xl">
          <StudentForm userData={{}} />
        </Card.Content>
      </Card>
    </>
  );
}
