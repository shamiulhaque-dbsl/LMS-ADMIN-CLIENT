import { Icons } from "@/components/Icons";
import Image from "next/image";
const ProfilePage = async () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="space-y-6 rounded-lg bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          {/* Profile Image */}
          <div className="relative h-32 w-32 lg:h-40 lg:w-40">
            <Image
              src="/images/blank-image.svg"
              alt="User Avatar"
              className="transform rounded-full border-2 border-red-300/80 shadow-lg transition duration-300 hover:scale-105"
              width={100}
              height={80}
            />
            <button className="absolute bottom-2 right-2 rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-700">
              <Icons.edit className="h-4 w-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Chayan</h1>
            <p className="mt-1 text-lg text-indigo-600">Senior UX/UI Designer</p>
            <p className="mt-2 text-sm text-gray-600">chayan@gmail.com</p>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-6 lg:justify-start">
              <button className="transform rounded-lg bg-red-500 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-red-700">
                Follow
              </button>
              <button className="rounded-lg bg-gray-200 px-6 py-3 text-gray-800 shadow-md hover:bg-gray-300">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Personal Info */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium">+1 (234) 567-8910</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Location:</p>
              <p className="font-medium">New York, USA</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Birthday:</p>
              <p className="font-medium">June 15, 1985</p>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Skills & Expertise</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Design Tools:</p>
              <p className="font-medium">Figma, Sketch, Adobe XD</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Web Development:</p>
              <p className="font-medium">HTML, CSS, JavaScript</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">UX Research:</p>
              <p className="font-medium">User Interviews, A/B Testing</p>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Activity Stats</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-indigo-600">256</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-green-600">1,356</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-yellow-600">350</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Account Settings</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <p className="text-gray-600">Change Email</p>
            <button className="text-indigo-600 hover:underline">Update</button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Change Password</p>
            <button className="text-indigo-600 hover:underline">Update</button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Privacy Settings</p>
            <button className="text-indigo-600 hover:underline">Manage</button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delete Account</p>
            <button className="bg-red-500 hover:underline">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
