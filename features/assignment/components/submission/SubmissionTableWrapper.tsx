import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { FileSpreadsheet, FileType } from "lucide-react";
import { Suspense } from "react";
import SubmissionTable from "./SubmissionTable";

interface Props {
  id: string;
}

export default function SubmissionTableWrapper({ id }: Props) {
  return (
    <Card className="border-none bg-white">
      <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
        <Text className="text-dark text-lg font-medium">Submission List</Text>

        <div className="flex gap-3">
          <Tooltip content="Export as CSV" placement="top">
            <Button size="sm" variant="outlineGray" type="button">
              <FileType className="h-4 w-4 text-blue-500" />
            </Button>
          </Tooltip>
          <Tooltip content="Export as Excel" placement="top">
            <Button size="sm" variant="outlineGray" type="button">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            </Button>
          </Tooltip>
        </div>
      </Card.Header>

      <Card.Content className="p-4 sm:p-6">
        <Suspense fallback={<div>Loading submissions...</div>}>
          <SubmissionTable id={id} />
        </Suspense>
      </Card.Content>
    </Card>
  );
}
