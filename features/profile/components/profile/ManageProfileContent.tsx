"use client";

import { useStore } from "../../../../components/accounts/store";
import ProfileContentWrapper from "@/features/profile/components/profile/overview/ProfileOverviewWrapper";
import { UserInfo } from "../../types";
import PasswordChange from "@/features/profile/components/password-change/index";

interface ManageProfileContentProps {
  profileData: UserInfo;
}

export const ManageProfileContent = ({ profileData }: ManageProfileContentProps) => {
  const activePage = useStore((state) => state.activePage);

  const renderMainContent = () => {

    if (activePage === "Password") {
      return <PasswordChange />;
    }

    return <ProfileContentWrapper profileData={profileData} />;
  };

  return <>{renderMainContent()}</>;
};
