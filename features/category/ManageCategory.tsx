import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/Button";
import CategoryTable from "@/features/category/components/CategoryTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { getCategories } from "@/api/category";
import { ErrorMessage } from "@/components/ErrorMessage";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Icons } from "@/components/Icons";

const fetchCategories = async () => (await getCategories()).data ?? [];

export default function ManageCategoryList() {
  return (
    <Card className="border-none bg-white">
      <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
        <Text className="text-dark text-lg font-medium">Categories</Text>

        <div className="flex gap-3">
          <Link href="/dashboard/courses/categories/create">
            <Button size="sm" variant="default" type="button">
              <Icons.plus className="mr-1 h-4 w-4" />
              Create Category
            </Button>
          </Link>
        </div>
      </Card.Header>

      <Card.Content className="p-4 sm:p-6">
        <ErrorBoundary fallback={<ErrorMessage />}>
          <Suspense fallback={<TableSkeleton />}>
            <CategoryTable fetchCategories={fetchCategories} />
          </Suspense>
        </ErrorBoundary>
      </Card.Content>
    </Card>
  );
}
