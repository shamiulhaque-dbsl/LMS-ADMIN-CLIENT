import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Plus } from "lucide-react";
import Link from "next/link";
import { USER_CONFIG } from "@/dashboard/users/config";
import { getAllStudents } from "@/api/user";
import StudentTable from "./StudentTable";

export default async function ManageStudent() {
  const config = USER_CONFIG.student;
  let userData: string[] = [];
  let errors: unknown = null;

  try {
    const studentRes = await getAllStudents();

    if (studentRes.status === "success" && studentRes.data) {
      userData = studentRes.data;
    } else {
      errors = studentRes.message || "Failed to fetch Student Data";
    }
  } catch (error) {
    errors = error || "Failed to fetch Student Data";
    console.log(errors);
  }

  return (
    <>
      <Card className="border-none bg-white">
        <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
          <Text className="text-dark text-lg font-medium">
            {config.title}
          </Text>

          <div className="flex gap-3">
            {/* <Tooltip content="Export as CSV" placement="top">
              <Button size="sm" variant="outlineGray" type="button">
                <FileType className="h-4 w-4 text-blue-500" />
              </Button>
            </Tooltip>
            <Tooltip content="Export as Excel" placement="top">
              <Button size="sm" variant="outlineGray" type="button">
                <FileSpreadsheet className="h-4 w-4 text-green-600" />
              </Button>
            </Tooltip> */}

            <Link href={config.createRoute} prefetch={false}>
              <Button size="sm" variant="default" type="button">
                <Plus className="mr-1 h-4 w-4" />
                {config.addLabel}
              </Button>
            </Link>
          </div>
        </Card.Header>

        <Card.Content className="p-4 sm:p-6">
          {errors ? (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              Failed to fetch Student Data
            </div>
          ) : (
            <StudentTable userData={userData} />
          )}
        </Card.Content>
      </Card>
    </>
  );
}
