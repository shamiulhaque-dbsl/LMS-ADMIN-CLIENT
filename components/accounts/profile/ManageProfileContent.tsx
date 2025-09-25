"use client";

import { useStore } from "../store";
import Order from "@/components/accounts/order";
import PasswordChange from "@/components/accounts/password-change";
import ProfileContentWrapper from "@/components/accounts/profile/overview/ProfileOverviewWrapper";

interface User {
  avatar: string;
  name: string;
  email: string;
  location: string;
}

interface Order {
  id: string;
  amount: number;
  course: string;
  date: string;
  status: string;
}

interface Certificate {
  title: string;
  course: string;
  date: string;
  url?: string;
}

interface ManageProfileContentProps {
  user: User;
  orders: Order[];
  certificates: Certificate[];
}

export const ManageProfileContent = ({ user, orders, certificates }: ManageProfileContentProps) => {
  const activePage = useStore((state) => state.activePage);

  const renderMainContent = () => {
    if (activePage === "Orders") {
      return <Order orders={orders} />;
    }

    if (activePage === "Password") {
      return <PasswordChange />;
    }

    return <ProfileContentWrapper user={user} certificates={certificates} />;
  };

  return <>{renderMainContent()}</>;
};
