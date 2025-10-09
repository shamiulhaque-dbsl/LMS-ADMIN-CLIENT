import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { Plus, FileSpreadsheet, FileType } from "lucide-react";
import Link from "next/link";
import { USER_CONFIG, UserType } from "@/admin/users/config";
import UserTable from "@/admin/users/components/UserTable";

interface ManageUserProps {
  userType?: UserType;
  showAllUsers?: boolean;
}
export default function ManageUser({ userType, showAllUsers = false }: ManageUserProps) {
  const config = USER_CONFIG[userType!];

  if (!config && !showAllUsers) {
    return (
      <div className="text-red-600 text-sm p-4 bg-red-50 rounded-lg">
        ⚠️ Invalid user type: <strong>{userType}</strong>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-white border-none">
        <Card.Header className="flex flex-wrap justify-between items-center gap-4 border-b px-4 py-3 sm:px-6 mb-0">
          <Text className="text-lg font-medium text-dark">
            {showAllUsers ? "All Users" : config.title}
          </Text>

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

            <Link href={showAllUsers ? "/admin/users/create" : config.createRoute} prefetch={false}>
              <Button size="sm" variant="default" type="button">
                <Plus className="w-4 h-4 mr-1" />
                {showAllUsers ? "Add User" : config.addLabel}
              </Button>
            </Link>
          </div>
        </Card.Header>

        <Card.Content className="p-4 sm:p-6">
          <UserTable />
        </Card.Content>
      </Card>
    </>
  );
}
