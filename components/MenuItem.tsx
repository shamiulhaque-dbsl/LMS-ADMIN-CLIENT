"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/tailwind-utils";

interface MenuItemProps {
  item: {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: MenuItemProps["item"][];
  };
  openMenus: Set<string>;
  onToggle: (menuId: string) => void;
  level?: number;
}

export function MenuItem({ item, openMenus, onToggle, level = 0 }: MenuItemProps) {
  const pathname = usePathname();
  const hasChildren = Boolean(item.children?.length);
  const isSubmenu = level > 0;

  const isOpen = openMenus.has(item.id);
  const isCurrentActive = item.href ? pathname === item.href : false;
  const isParentOfActive =
    hasChildren && item.children?.some((child) => child.href && pathname === child.href);

  const styles = {
    item: cn(
      // Base styles
      "relative flex w-full items-center px-4 py-2.5 text-sm transition-colors rounded-lg",
      "hover:bg-gray-100/70",
      // Menu item specific styles
      isSubmenu
        ? [
            // Submenu styles
            "text-gray-600 py-1",
            isCurrentActive && "font-medium text-gray-900",
          ]
        : [
            // Main menu styles
            "font-medium text-gray-700",
            (isCurrentActive || isParentOfActive) && [
              "text-gray-900 bg-gray-100/70",
              "before:absolute before:left-0 before:top-0 before:bottom-0",
              "before:w-1 before:bg-web-primary/70 before:rounded-l",
            ],
          ]
    ),
    icon: cn(
      "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
      isCurrentActive || isParentOfActive
        ? "text-gray-900"
        : "text-gray-500 group-hover:text-gray-700"
    ),
    chevron: cn(
      "ml-auto h-4 w-4 transition-transform duration-200",
      isOpen ? "rotate-180" : "rotate-0",
      isCurrentActive || isParentOfActive ? "text-gray-900" : "text-gray-500"
    ),
    submenuContainer: cn(
      "overflow-hidden transition-all duration-200",
      isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    ),
    submenuContent: "pl-4 mt-1 ml-2 border-l border-gray-200/50 space-y-1",
  };

  return (
    <li className="relative">
      {hasChildren ? (
        <button onClick={() => onToggle(item.id)} className={styles.item}>
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={styles.chevron} />
        </button>
      ) : (
        <Link href={item.href || "#"} className={styles.item}>
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className="flex-1 text-left">{item.label}</span>
        </Link>
      )}

      {hasChildren && (
        <div className={styles.submenuContainer}>
          <ul className={styles.submenuContent}>
            {item.children?.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                openMenus={openMenus}
                onToggle={onToggle}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
