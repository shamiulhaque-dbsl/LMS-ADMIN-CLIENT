"use client";

import Link from "next/link";
import Image from "next/image";
import { useDropdown } from "@/hooks/useDropdown";
import { Dropdown } from "@/components/common/Dropdown";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLoginActions } from "@/features/auth/hooks/useLoginActions";
import { ROUTES } from "@/lib/constants/routes";

interface MenuItem {
  label: string;
  href: string;
}

export const UserProfileDropdown: React.FC = () => {
  const { isOpen, toggle, close } = useDropdown();
  const { user, isLoading } = useAuthStore();
  const { logout } = useLoginActions();

  const menuItems: MenuItem[] = [
    { label: "My Profile", href: ROUTES.ADMIN.USERS.PROFILE },
    { label: "Settings", href: ROUTES.SETTINGS },
  ];

  const handleLogout = async () => {
    await logout();
    close();
  };

  const trigger = (
    <button
      type="button"
      onClick={toggle}
      className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open user menu</span>
      <Image
        className="h-8 w-8 rounded-full"
        src="/images/profile.jpg"
        alt={user?.user_name || "User photo"}
        width={100}
        height={100}
      />
    </button>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={close}
      trigger={trigger}
      className="w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
    >
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-600">
        <p className="text-sm text-gray-900 dark:text-white"> {user?.user_name || "Guest"}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-300">
          {user?.email || "guest@example.com"}
        </p>
      </div>
      <ul className="py-1">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {isLoading ? "Logging out..." : "Log Out"}
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};
