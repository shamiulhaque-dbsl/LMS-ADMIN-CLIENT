import { PageHeader } from "@/components/page/PageHeader";
import { CategoryForm } from "@/dashboard/courses/components/category/CategoryForm";
import { Card } from "@/components/ui/Card";

export default function CategoryCreatePage() {
  return (
    <>
      <PageHeader title="Add new category" />
      <Card className="bg-white p-6">
        <Card.Header>
          <Card.Title>Category add form</Card.Title>
        </Card.Header>
        <Card.Content className="max-w-xl">
          <CategoryForm />
        </Card.Content>
      </Card>
    </>
  );
}
