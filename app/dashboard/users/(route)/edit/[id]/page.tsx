import { PageHeader } from "@/components/page/PageHeader";
import { UserForm } from "@/features/user/components/UserForm";
import { Card } from "@/components/ui/Card";
import { getIdWiseUser } from "@/api/user";

type UserEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserEditPage({ params }: UserEditPageProps) {
  const { id } = await params;
  const userId = Number(id);
  let userData = {}
  let errors = null;

  try {
    const userRes = await getIdWiseUser(userId);

    if (userRes.status === "success") {
      userData = userRes.data;
    } else {
      errors = userRes.message || "Failed to fetch User Data";
    }
  } catch {
    errors = "Failed to fetch User Data";
    console.log(errors);
  }

  return (
    <>
      <PageHeader title={id ? "Edit User" : "Add new User"} />
      <Card className="bg-white p-6">
        <Card.Content className="max-w-xl">
          <UserForm userData={userData} />
        </Card.Content>
      </Card>
    </>
  );
}
