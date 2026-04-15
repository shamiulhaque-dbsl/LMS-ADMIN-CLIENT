import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { ErrorMessage } from "@/components/ErrorMessage";
import { getLiveSessions } from "@/api/live-session";
import LiveClassTable from "./LiveClassTable";
import { LiveSession } from "../types";

/*
  #TODO: 
  1. Add Pagination, Filtering, and Sorting functionalities.
  2. Implement Export functionalities for CSV and Excel.
*/
const fetchLiveClasses = async (): Promise<LiveSession[] | []> => (await getLiveSessions()).data ?? [];

export default function ManageLiveClasses() {
  return (
    <>
      {/* <CoursesFilters /> */}

      <Card className="border-none bg-white">
        <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
          <Text className="text-dark text-lg font-medium">Classes List</Text>

          <div className="flex gap-3">

            {/* Add Live Class */}
            <Link href="/dashboard/courses/live-classes/create">
              <Button size="sm" variant="default" type="button">
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Live Class
              </Button>
            </Link>
          </div>
        </Card.Header>

        <Card.Content className="p-4 sm:p-6">
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense fallback={<TableSkeleton columns={11} rowCount={5} />}>
              <LiveClassTable fetchLiveClasses={fetchLiveClasses} />
            </Suspense>
          </ErrorBoundary>
        </Card.Content>
      </Card>
    </>
  );
}
