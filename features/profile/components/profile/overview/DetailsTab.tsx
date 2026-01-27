import { UserInfo } from "@/features/profile/types";
import DetailsCard from "./DetailsCard";


export default function DetailsTab({ profileData }: { profileData: UserInfo }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
      </div>
      <div className="">
        <DetailsCard profileData={profileData} />

      </div>
    </div>
  );
}
