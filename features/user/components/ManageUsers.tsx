import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Plus } from "lucide-react";
import Link from "next/link";
import { USER_CONFIG, UserType } from "@/dashboard/users/config";
import UserTable from "@/features/user/components/UserTable";
import { getRoleWiseActiveUsers } from "@/api/user";

interface ManageUserProps {
  userType?: UserType;
  showAllUsers?: boolean;
}
export default async function ManageUser({ userType, showAllUsers = false }: ManageUserProps) {
  const config = USER_CONFIG[userType!];
  let userData = null;
  let errors = null;

  try {
    const userRes = await getRoleWiseActiveUsers();

    if (userRes.status === "success") {
      userData = userRes.data;
    } else {
      errors = userRes.message || "Failed to fetch User Data";
    }
  } catch (error) {
    errors = "Failed to fetch User Data";
  }

  if (!config && !showAllUsers) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        ⚠️ Invalid user type: <strong>{userType}</strong>
      </div>
    );
  }


  return (
    <>
      <Card className="border-none bg-white">
        <Card.Header className="mb-0 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
          <Text className="text-dark text-lg font-medium">
            {showAllUsers ? "All Users" : config.title}
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

            <Link href={showAllUsers ? "/dashboard/users/create" : config.createRoute} prefetch={false}>
              <Button size="sm" variant="default" type="button">
                <Plus className="mr-1 h-4 w-4" />
                {showAllUsers ? "Add User" : config.addLabel}
              </Button>
            </Link>
          </div>
        </Card.Header>

        <Card.Content className="p-4 sm:p-6">
          <UserTable userData={userData} />
        </Card.Content>
      </Card>
    </>
  );
}
