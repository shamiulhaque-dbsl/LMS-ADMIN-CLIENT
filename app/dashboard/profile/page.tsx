import ProfileSidebar from "@/features/profile/components/profile/sidebar";
import { ManageProfileContent } from "@/features/profile/components/profile/ManageProfileContent";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/api/auth";


const UserProfilePage = async () => {
  let profileData = null;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;
  try {
    const detailsData = await getCurrentUser({ headers: { Authorization: `Bearer ${accessToken}` } });
    if (detailsData.status === "success") {
      profileData = detailsData.data;
    }

  } catch {
    profileData = null;
  }




  return (
    <>
      <Breadcrumb mode="portal" className="mb-6" />

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full flex-shrink-0 lg:w-64 xl:w-80">
          <ProfileSidebar user={profileData} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ManageProfileContent profileData={profileData} />
        </main>
      </div>
    </>
  );
};

export default UserProfilePage;
