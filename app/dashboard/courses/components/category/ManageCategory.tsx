import { Button } from "@/components/ui/Button";
import CourseTable from "./CategoryTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { Plus, FileSpreadsheet, FileType } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ManageCourseCategory() {
  return (
    <Card className="border-none bg-white">
      <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
        <Text className="text-dark text-lg font-medium">Categories List</Text>

        <div className="flex gap-3">
          <Link href="/admin/courses/categories/create">
            <Button size="sm" variant="default" type="button">
              <Plus className="mr-1 h-4 w-4" />
              Add Category
            </Button>
          </Link>
        </div>
      </Card.Header>

      <Card.Content className="p-4 sm:p-6">
        <Suspense fallback={<div>Loading quizzes...</div>}>
          <CourseTable />
        </Suspense>
      </Card.Content>
    </Card>
  );
}
