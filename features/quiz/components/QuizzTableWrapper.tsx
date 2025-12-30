import { Button } from "@/components/ui/Button";
import QuizzTable from "./QuizzTable";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { Plus, FileSpreadsheet, FileType } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { ROUTES } from "@/lib/constants/routes";
import { getQuizzes } from "@/api/quiz";

interface QuizzTableWrapperProps {
  filters: {
    dateFrom?: string;
    dateTo?: string;
    course?: string;
    instructor?: string;
    status?: string;
    page?: number;
  };
}

export default function QuizzTableWrapper({ filters }: QuizzTableWrapperProps) {
  const { data = [] } = use(getQuizzes(filters));

  return (
    <Card className="border-none bg-white">
      <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
        <div className="leading-normal">
          <Text className="text-dark text-lg font-medium">Quizzes List</Text>
          <Text as="span" className="text-sm">
            Manage all quizzes, track their status, and edit as needed.
          </Text>
        </div>

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

          {/* Add Course */}
          <Link href={ROUTES.QUIZZES.CREATE}>
            <Button size="sm" variant="default" type="button">
              <Plus className="mr-1 h-4 w-4" />
              Add Quizz
            </Button>
          </Link>
        </div>
      </Card.Header>
      <Card.Content className="p-4 sm:p-6">
        <QuizzTable quizzes={data} currentPage={filters.page} />
      </Card.Content>
    </Card>
  );
}
