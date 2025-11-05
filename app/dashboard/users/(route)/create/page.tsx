import { PageHeader } from "@/components/page/PageHeader";
import { UserForm } from "@/dashboard/users/components/UserForm";
import { Card } from "@/components/ui/Card";

export default function UserCreatePage() {
  return (
    <>
      <PageHeader title="Add new User" />
      <Card className="bg-white p-6">
        <Card.Content className="max-w-xl">
          <UserForm />
        </Card.Content>
      </Card>
    </>
  );
}
