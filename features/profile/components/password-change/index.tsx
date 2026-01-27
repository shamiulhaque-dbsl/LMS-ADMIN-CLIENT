import { Card } from "@/components/ui/Card";
import { PasswordChangeForm } from "@/features/profile/components/password-change/Form";

export default function PasswordChange() {
  return (
    <>
      {/* TODO: Separate this into a PasswordChangeHeader component */}
      <Card className="mb-8 hidden p-4 sm:block bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
          <p className="mt-1 text-gray-600">Update your account password for security</p>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <PasswordChangeForm />
      </Card>
    </>
  );
}
