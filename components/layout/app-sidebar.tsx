"use client";

import { MenuItem } from "@/components/MenuItem";
import Logo from "@/components/Logo";
import { useSidebar } from "@/contexts/SidebarContext";
import { menuItems } from "@/lib/constants/menuItem";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils/tailwind-utils";
export const AppSidebar = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);

      // If menu is already open, close it
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
        return newSet;
      }

      // If opening a new menu, only keep that one open
      return new Set([menuId]);
    });
  };

  // Effect to handle initial and route change menu state
  useEffect(() => {
    // Find parent menu that contains the current route
    const findParentMenuId = () => {
      for (const item of menuItems) {
        if (item.children?.some((child) => child.href === pathname)) {
          return item.id;
        }
      }
      return null;
    };

    const parentId = findParentMenuId();
    if (parentId) {
      setOpenMenus(new Set([parentId]));
    } else {
      // No parent → close all menus
      setOpenMenus(new Set());
    }
  }, [pathname]);

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 transform-gpu transition-all duration-300",
          "bg-white/95 backdrop-blur-xl border-r border-gray-200/60",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "sm:translate-x-0 sm:shadow-lg sm:shadow-gray-900/10"
        )}
      >
        <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="relative border-b border-gray-200/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo className="text-xl font-bold tracking-wide text-gray-900" />
              <button
                onClick={toggleSidebar}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "bg-gray-100/80 hover:bg-gray-200/80 border border-gray-300/50",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                )}
              >
                {isSidebarOpen ? (
                  <Icons.chevronLeft className="h-5 w-5 text-gray-600" />
                ) : (
                  <Icons.chevronRight className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} openMenus={openMenus} onToggle={toggleMenu} />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/20 backdrop-blur-sm sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AppSidebar;
