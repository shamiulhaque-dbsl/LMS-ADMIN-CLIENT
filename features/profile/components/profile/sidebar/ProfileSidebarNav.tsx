"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useStore } from "@/components/accounts/store";
import React from "react";

const navigationItems = [
  { icon: Icons.user, label: "Profile", key: "Profile" },
  { icon: Icons.eye, label: "Password", key: "Password" },
];

interface NavItemProps {
  item: {
    icon: React.ElementType;
    label: string;
    key: string;
  };
}

const NavItem = ({ item }: NavItemProps) => {
  const isActive = useStore((state) => state.activePage === item.key);
  const setActivePage = useStore((state) => state.setActivePage);

  return (
    <Button
      onClick={() => setActivePage(item.key)}
      className={`flex w-full items-center justify-normal rounded-lg px-4 py-3 text-left transition-colors ${isActive
        ? "border-r-2 border-web-primary bg-web-primary/10"
        : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <item.icon
        className={`mr-3 h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
          }`}
      />
      <Text variant="dark" className="font-medium">
        {item.label}
      </Text>
    </Button>
  );
};
NavItem.displayName = "NavItem";

export const ProfileSidebarNav = () => {
  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <NavItem key={item.key} item={item} />
      ))}
    </nav>
  );
};

ProfileSidebarNav.displayName = "ProfileSidebarNav";
