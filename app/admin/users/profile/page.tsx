import { Icons } from "@/components/Icons";
import Image from "next/image";
import { getSession } from "@/lib/auth/session";
const ProfilePage = async () => {
  const user = await getSession();
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative w-32 h-32 lg:w-40 lg:h-40">
            <Image
              src="/images/blank-image.svg"
              alt="User Avatar"
              className="rounded-full border-2 border-red-300/80 shadow-lg transform transition duration-300 hover:scale-105"
              width={100}
              height={80}
            />
            <button className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-700">
              <Icons.edit className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-lg text-indigo-600 mt-1">Senior UX/UI Designer</p>
            <p className="text-sm text-gray-600 mt-2">{user?.email}</p>

            {/* Action Buttons */}
            <div className="flex justify-center lg:justify-start gap-6 mt-4">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transform transition duration-300">
                Follow
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Personal Info */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
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
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills & Expertise</h2>
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
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Stats</h2>
          <div className="flex justify-between items-center">
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
      <div className="mt-8 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
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
