"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import ProfileHeader from "@/features/profile/components/profile/header/ProfileHeader";
import { Tab } from "./Tabs";
//import OverviewTab from "./OverviewTab";
import DetailsTab from "./DetailsTab";
import { UserInfo } from "@/features/profile/types";

export const PROFILE_TABS = {
  // OVERVIEW: "Overview",
  DETAILS: "Details",
} as const;


export type ProfileTab = (typeof PROFILE_TABS)[keyof typeof PROFILE_TABS];

interface ProfileOverviewWrapperProps {
  profileData: UserInfo;
}

export default function ProfileOverviewWrapper({
  profileData,
}: ProfileOverviewWrapperProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(PROFILE_TABS.DETAILS);

  const tabs: ProfileTab[] = Object.values(PROFILE_TABS);

  return (
    <>
      <ProfileHeader profileData={profileData} />

      <Card className="mb-8 bg-white">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                label={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </nav>
        </div>
        <div className="p-6">
          {/* {activeTab === PROFILE_TABS.OVERVIEW && <OverviewTab profileData={profileData} />} */}
          {activeTab === PROFILE_TABS.DETAILS && (
            <DetailsTab profileData={profileData} />
          )}
        </div>
      </Card>
    </>
  );
}
