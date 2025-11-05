import { Button } from "@/components/ui/Button";
import CategoryTable from "@/features/category/components/CategoryTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import { getCategories } from "@/api/category";
import { ErrorBoundary } from "react-error-boundary";

export default function ManageCategory() {
  const categories = use(getCategories());

  return (
    <Card className="border-none bg-white">
      <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
        <Text className="text-dark text-lg font-medium">Categories List</Text>

        <div className="flex gap-3">
          <Link href="/dashboard/courses/categories/create">
            <Button size="sm" variant="default" type="button">
              <Plus className="mr-1 h-4 w-4" />
              Add Category
            </Button>
          </Link>
        </div>
      </Card.Header>

      {/* 
        #TODO: Improve this error boundary with more proper error handling
      */}
      <Card.Content className="p-4 sm:p-6">
        <ErrorBoundary fallback={<>Failed to load categories</>}>
          <Suspense fallback={<>Loading categories...</>}>
            <CategoryTable categories={categories.data} />
          </Suspense>
        </ErrorBoundary>
      </Card.Content>
    </Card>
  );
}
