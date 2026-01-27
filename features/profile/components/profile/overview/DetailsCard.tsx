import { UserInfo } from "@/features/profile/types";
import { Cog, GalleryVerticalEnd, Codesandbox, Grip } from "lucide-react";


export default function DetailsCard({ profileData }: { profileData: UserInfo }) {

  let parsedSocialLinks = {};
  try {
    parsedSocialLinks = profileData.socialLinks ? JSON.parse(profileData.socialLinks) : {};
  } catch {
    parsedSocialLinks = {};
  }


  return (
    <div className="p-4 transition-shadow hover:shadow-md">
      {/* About Section */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-md border">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-1 w-12 rounded bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <h2 className="text-xl font-bold text-gray-900">About</h2>
        </div>
        <p className="leading-relaxed w-full text-gray-700">
          {profileData?.about || ""}
        </p>
      </div>


      {
        (profileData?.professionalExperience || profileData?.expertise) && (
          <section className="grid grid-cols-2 gap-4 mb-4">

            <div className="rounded-xl bg-white p-6 shadow-md border">
              <div className="mb-4 flex items-center gap-2">
                <Cog className="h-6 w-6 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">Professional Experience</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {profileData?.professionalExperience || "N/A"}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md border">
              <div className="mb-4 flex items-center gap-2">
                <Codesandbox className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">Areas of Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {profileData?.expertise || "N/A"}
                </span>
              </div>
            </div>
          </section>
        )
      }


      {
        profileData?.professionalExperienceDetails &&
        <div className="rounded-xl bg-white p-6 shadow-md border mb-4">
          <div className="mb-4 flex items-center gap-2">
            <Grip className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900"> Professional Experience Details</h2>
          </div>
          <p className="leading-relaxed w-full text-gray-700">
            {profileData?.professionalExperienceDetails || "N/A"}
          </p>
        </div>

      }



      <div className="rounded-xl bg-white p-6 shadow-md border">
        <div className="mb-4 flex items-center gap-2">
          <GalleryVerticalEnd className="h-6 w-6 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-900">Social Media</h2>
        </div>

        <div className="flex flex-col gap-2">
          {Object.entries(parsedSocialLinks)?.map(([platform, url]) => (
            <div
              key={platform}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              <span className="capitalize font-bold">{platform}</span>:{" "}
              <a
                href={String(url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline-none"
              >
                {String(url)}
              </a>
            </div>
          ))}
        </div>

      </div>




    </div >
  );
}
