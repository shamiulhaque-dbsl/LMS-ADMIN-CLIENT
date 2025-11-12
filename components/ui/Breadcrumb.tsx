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
  mode: "website" | "portal";
  websiteHomeUrl?: string;
  portalHomeUrl?: string;
}

/**
 * Detects if a path segment looks like an ID.
 * Handles numeric IDs (e.g., "69") and UUID-like strings (hex or dashed forms).
 */
const isIdSegment = (segment: string): boolean => {
  return (
    /^\d+$/.test(segment) || // numeric IDs
    /^[0-9a-fA-F]{8,}$/.test(segment) || // long hex strings
    /^[0-9a-fA-F-]{36}$/.test(segment) // UUIDs (with dashes)
  );
};

/**
 * Formats a breadcrumb label for readability.
 * Converts kebab-case to Title Case and skips ID-like segments.
 */
const formatLabel = (segment: string): string =>
  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

/**
 * Main breadcrumb component for both website and portal routes.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  className = "",
  mode = "website",
  websiteHomeUrl = "/",
  portalHomeUrl = "/dashboard",
}) => {
  const pathname = usePathname();

  const breadcrumbItems = React.useMemo(() => {
    if (items.length > 0) return items; // Prefer custom items if provided

    const pathSegments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    // --- Portal Mode ---
    if (mode === "portal") {
      const portalBase = portalHomeUrl.split("/").filter(Boolean)[0]; // usually 'dashboard'
      const portalIndex = pathSegments.findIndex((seg) => seg === portalBase);

      if (portalIndex !== -1) {
        const relevantSegments = pathSegments.slice(portalIndex + 1);
        currentPath = portalHomeUrl;

        return relevantSegments
          .filter((seg) => !isIdSegment(seg))
          .map((seg) => {
            currentPath += `/${seg}`;
            return { label: formatLabel(seg), href: currentPath };
          });
      }
      return [];
    }

    // --- Website Mode ---
    return pathSegments
      .filter((seg) => !isIdSegment(seg))
      .map((seg) => {
        currentPath += `/${seg}`;
        return { label: formatLabel(seg), href: currentPath };
      });
  }, [pathname, items, mode, portalHomeUrl]);

  // Home element
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
        {/* Home/Dashboard */}
        <li className="flex items-center">{homeElement}</li>

        {breadcrumbItems.length > 0 && (
          <>
            <li className="mx-1 text-gray-400">
              <DynamicIcon name="chevronRight" />
            </li>

            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="font-medium text-gray-400" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>

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
