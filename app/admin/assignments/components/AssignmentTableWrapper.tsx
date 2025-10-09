import { Button } from "@/components/ui/Button";
import AssignmentTable from "@/admin/assignments/components/AssignmentTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { FileSpreadsheet, FileType } from "lucide-react";

export default function AssignmentTableWrapper() {
  return (
    <Card className="bg-white border-none">
      <Card.Header className="flex flex-wrap justify-between items-center gap-4 border-b px-4 py-3 sm:px-6 mb-0">
        <Text className="text-lg font-medium text-dark">Assignment List</Text>

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
        </div>
      </Card.Header>

      <Card.Content className="p-4 sm:p-6">
        <AssignmentTable />
      </Card.Content>
    </Card>
  );
}
