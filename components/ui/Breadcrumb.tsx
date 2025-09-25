"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicIcon from "./DynamicIcon";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  // Choose which mode to use
  mode: "website" | "portal";
  // Base URLs
  websiteHomeUrl?: string;
  portalHomeUrl?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  className = "",
  mode = "website",
  websiteHomeUrl = "/",
  portalHomeUrl = "/admin",
}) => {
  const pathname = usePathname();

  // Generate breadcrumb items if none provided
  const breadcrumbItems = React.useMemo(() => {
    // If items are provided, use them
    if (items.length > 0) return items;

    // Otherwise generate from current path
    const pathSegments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    // For portal mode, we start after the dashboard segment
    if (mode === "portal") {
      const portalBaseSegment = portalHomeUrl.split("/").filter(Boolean)[0]; // 'dashboard'
      const portalIndex = pathSegments.findIndex((segment) => segment === portalBaseSegment);
      // Only process segments after the portal base (dashboard)
      if (portalIndex !== -1) {
        const relevantSegments = pathSegments.slice(portalIndex + 1);
        currentPath = portalHomeUrl;

        return relevantSegments.map((segment) => {
          currentPath += `/${segment}`;
          // Format: replace hyphens with spaces and capitalize
          return {
            label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            href: currentPath,
          };
        });
      }
      return [];
    }

    // Standard website behavior - include all segments
    return pathSegments.map((segment) => {
      currentPath += `/${segment}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: currentPath,
      };
    });
  }, [pathname, items, mode, portalHomeUrl]);

  // Determine the "home" element based on mode
  const homeElement =
    mode === "portal" ? (
      <Link
        href={portalHomeUrl}
        className="flex items-center text-muted-foreground hover:text-primary"
      >
        <DynamicIcon name="dashboard" className="mr-1" />
        <span className="sr-only md:not-sr-only">Dashboard</span>
      </Link>
    ) : (
      <Link
        href={websiteHomeUrl}
        className="flex items-center text-muted-foreground hover:text-primary"
      >
        <DynamicIcon name="house" className="mr-1" />
        <span className="sr-only md:not-sr-only">Home</span>
      </Link>
    );

  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {/* Home/Dashboard link */}
        <li className="flex items-center">{homeElement}</li>

        {/* Render breadcrumb items only if there are any */}
        {breadcrumbItems.length > 0 && (
          <>
            {/* Separator after home/dashboard */}
            <li className="mx-1 text-gray-400">
              <DynamicIcon name="chevronRight" />
            </li>

            {/* Map through the breadcrumb items */}
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  {index === breadcrumbItems.length - 1 ? (
                    // Last item (current page) - not clickable
                    <span className="font-medium text-gray-400" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    // Clickable breadcrumb item
                    <Link href={item.href} className="text-muted-foreground hover:text-primary">
                      {item.label}
                    </Link>
                  )}
                </li>

                {/* Add separator between items, but not after the last item */}
                {index < breadcrumbItems.length - 1 && (
                  <li className="mx-1 text-gray-400">
                    <DynamicIcon name="chevronRight" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
