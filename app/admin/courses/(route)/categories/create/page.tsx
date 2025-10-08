import { PageHeader } from "@/components/page/PageHeader";
import { CategoryForm } from "@/app/admin/courses/components/category/CategoryForm";
import { Card } from "@/components/ui/Card";

export default function CategoryCreatePage() {
  return (
    <>
      <PageHeader title="Add new category" />
      <Card className="bg-white max-w-4xl mx-auto p-6">
        <Card.Header>
          <Card.Title>Category add form</Card.Title>
        </Card.Header>
        <Card.Content className="py-4">
          <CategoryForm />
        </Card.Content>
      </Card>
    </>
  );
}
