"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import ProfileHeader from "@/components/accounts/profile/header/ProfileHeader";
import { Tab } from "./Tabs";
import OverviewTab from "./OverviewTab";
import CertificatesTab from "./CertificatesTab";

export const PROFILE_TABS = {
  OVERVIEW: "Overview",
  CERTIFICATES: "Certificates",
} as const;

interface Certificate {
  title: string;
  course: string;
  date: string;
  url?: string;
}

interface User {
  avatar: string;
  name: string;
  email: string;
  location: string;
}

export type ProfileTab = (typeof PROFILE_TABS)[keyof typeof PROFILE_TABS];

interface ProfileOverviewWrapperProps {
  user: User;
  certificates: Certificate[];
}

export default function ProfileOverviewWrapper({
  user,
  certificates,
}: ProfileOverviewWrapperProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(PROFILE_TABS.OVERVIEW);

  const tabs: ProfileTab[] = Object.values(PROFILE_TABS);

  return (
    <>
      <ProfileHeader user={user} />

      <Card className="mb-8">
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
          {activeTab === PROFILE_TABS.OVERVIEW && <OverviewTab />}
          {activeTab === PROFILE_TABS.CERTIFICATES && (
            <CertificatesTab certificates={certificates} />
          )}
        </div>
      </Card>
    </>
  );
}
