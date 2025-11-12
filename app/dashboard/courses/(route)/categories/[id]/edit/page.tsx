import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PageHeader } from "@/components/page/PageHeader";
import { Card } from "@/components/ui/Card";
import { getCategory } from "@/api/category";
import { Category } from "@/features/category/types";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CategoryEditContent } from "@/features/category/components/CategoryEditContent";

type CategoryEditPageProps = {
  params: Promise<{ id: string }>;
};

/*
  #TODO:
  1. Pass promise to CategoryEditContent
  2. Use proper skeleton
*/
const fetchCategory = async (id: string | number): Promise<Category> => {
  const res = await getCategory(id);
  if (!res.data) throw new Error("Category not found");
  return res.data;
};

export default function CategoryEditPage({ params }: CategoryEditPageProps) {
  const { id } = use(params);
  if (!id) return <ErrorMessage message="Missing category ID" />;

  return (
    <>
      <PageHeader title="Edit category" />
      <Card className="bg-white p-6">
        <Card.Content className="max-w-xl">
          <ErrorBoundary fallback={<ErrorMessage message="Failed to load category form" />}>
            <Suspense fallback={<div className="text-red-500">Loading category...</div>}>
              <CategoryEditContent fetchCategory={() => fetchCategory(id)} />
            </Suspense>
          </ErrorBoundary>
        </Card.Content>
      </Card>
    </>
  );
}
