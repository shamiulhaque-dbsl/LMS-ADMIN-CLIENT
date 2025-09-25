import { Card } from "@/components/ui/Card";
import { Mail, MapPin } from "lucide-react";
import { EditProfileButton } from "../EditProfileButton";
interface User {
  avatar: string;
  name: string;
  email: string;
  location: string;
}
export default function ProfileHeader({ user }: { user: User }) {
  return (
    <Card className="mb-8 p-4">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div className="mb-4 flex flex-col xl:mb-0">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">{user.name}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 sm:space-x-4">
            <div className="flex items-center">
              <Mail className="mr-1 h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <EditProfileButton user={user} />
        </div>
      </div>
    </Card>
  );
}
