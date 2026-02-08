import { PageHeader } from "@/components/page/PageHeader";
import { UserForm } from "@/features/user/components/UserForm";
import { Card } from "@/components/ui/Card";
import { getIdWiseUser } from "@/api/user";

type UserEditPageProps = {
  params: { id: number };
};

export default async function UserEditPage({ params }: UserEditPageProps) {
  const { id } = params;
  let userData = {}
  let errors = null;

  try {
    const userRes = await getIdWiseUser(id);

    if (userRes.status === "success") {
      userData = userRes.data;
    } else {
      errors = userRes.message || "Failed to fetch User Data";
    }
  } catch (error) {
    errors = "Failed to fetch User Data";
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
