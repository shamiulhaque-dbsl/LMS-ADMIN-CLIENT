import { Button } from "@/components/ui/Button";
import CourseTable from "./CourseTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { Plus, FileSpreadsheet, FileType } from "lucide-react";
import Link from "next/link";

export default function CourseTableWrapper() {
  return (
    <Card className="bg-white border-none">
      <Card.Header className="flex flex-wrap justify-between items-center gap-4 border-b px-4 py-3 sm:px-6 mb-0">
        <Text className="text-lg font-medium text-dark">Courses List</Text>

        <div className="flex gap-3">
          <Tooltip content="Export as CSV" placement="top">
            <Button size="sm" variant="outlineGray" type="button">
              <FileType className="w-4 h-4 text-blue-500" />
            </Button>
          </Tooltip>
          <Tooltip content="Export as Excel" placement="top">
            <Button size="sm" variant="outlineGray" type="button">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
            </Button>
          </Tooltip>

          {/* Add Course */}
          <Link href="/admin/courses/create">
            <Button size="sm" variant="default" type="button">
              <Plus className="w-4 h-4 mr-1" />
              Add Course
            </Button>
          </Link>
        </div>
      </Card.Header>

      <Card.Content className="p-4 sm:p-6">
        <CourseTable />
      </Card.Content>
    </Card>
  );
}
