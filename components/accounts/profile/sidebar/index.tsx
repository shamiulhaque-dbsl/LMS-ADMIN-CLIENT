import { Card } from "@/components/ui/Card";
import ReusableImage from "@/components/ui/Image";
import { ProfileSidebarNav } from "./ProfileSidebarNav";
import Text from "@/components/ui/Text";

interface User {
  avatar: string;
  name: string;
  email: string;
  location: string;
}

export default function ProfileSidebar({ user }: { user: User }) {
  return (
    <Card className="sticky top-8">
      <Card.Content className="space-y-6 p-4 sm:p-6">
        {/* User Info */}
        <div className="flex flex-row items-center gap-3 text-left sm:flex-col sm:text-center">
          <ReusableImage
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 flex-shrink-0 rounded-full sm:mx-auto sm:mb-2 sm:h-20 sm:w-20"
          />
          <div className="leading-tight">
            <Text as="h2" variant="dark" className="font-semibold">
              {user.name}
            </Text>
            <Text as="small" variant="muted" className="block">
              {user.email}
            </Text>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <ProfileSidebarNav />
      </Card.Content>
    </Card>
  );
}
