import { Card } from "@/components/ui/Card";
import { Mail, Phone } from "lucide-react";
import { EditProfileButton } from "../EditProfileButton";
import { UserInfo } from "@/features/profile/types";

export default function ProfileHeader({ profileData }: { profileData: UserInfo }) {

  return (
    <Card className="mb-8 p-4 bg-white">
      <div className="flex flex-col xl:flex-row justify-between">
        <div className="mb-4 flex flex-col xl:mb-0">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 capitalize">{profileData?.fullName}</h1>

          {profileData?.bio && (
            <div className="mt-4 mb-2 pt-4 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {profileData?.bio}
              </p>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-1 lg:flex gap-3">
            {profileData?.email &&
              <div className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                <span>{profileData?.email}</span>
              </div>}
            {profileData?.phone &&
              <div className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                <span>{profileData?.phone}</span>
              </div>}
          </div>
        </div>
        <div className="flex space-x-3">
          <EditProfileButton user={profileData} />
        </div>
      </div>
    </Card>
  );
}
