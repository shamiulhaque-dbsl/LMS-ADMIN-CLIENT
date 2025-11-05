import { PageHeader } from "@/components/page/PageHeader";
import { CategoryForm } from "@/features/category/components/CategoryForm";
import { Card } from "@/components/ui/Card";
import { use } from "react";
import { getCategory } from "@/api/category";

export default function CategoryEditPage({ params }: { params: Promise<any> }) {
  const { id } = use(params);
  if (!id) return null;

  const { data: category } = use(getCategory(id));
  if (!category) return null;

  return (
    <>
      <PageHeader title="Add new category" />
      <Card className="bg-white p-6">
        <Card.Header>
          <Card.Title>Category add form</Card.Title>
        </Card.Header>
        <Card.Content className="max-w-xl">
          <CategoryForm category={category} />
        </Card.Content>
      </Card>
    </>
  );
}
