import React, { memo, useMemo } from "react";
import { TabItem } from "./tabs.type";
import { getTabClasses } from "./utils/tabs.utils";
import { VARIANT_CLASSES, SIZE_CLASSES } from "./tabs.constants";

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  variant: keyof typeof VARIANT_CLASSES;
  size: keyof typeof SIZE_CLASSES;
  orientation: "horizontal" | "vertical";
  fullWidth: boolean;
  tabClassName: string;
  activeTabClassName: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}

export const TabButton = memo<TabButtonProps>(
  ({
    tab,
    isActive,
    variant,
    size,
    orientation,
    fullWidth,
    tabClassName,
    activeTabClassName,
    onClick,
    onKeyDown,
    tabRef,
  }) => {
    const classes = useMemo(
      () =>
        getTabClasses(
          isActive,
          variant,
          size,
          orientation,
          fullWidth,
          tabClassName,
          activeTabClassName
        ),
      [isActive, variant, size, orientation, fullWidth, tabClassName, activeTabClassName]
    );

    return (
      <button
        ref={tabRef}
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
        disabled={tab.disabled}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        id={`tab-${tab.id}`}
        tabIndex={isActive ? 0 : -1}
        type="button"
      >
        <span className="flex items-center gap-2">
          {tab.icon}
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {tab.badge}
            </span>
          )}
        </span>
      </button>
    );
  }
);

TabButton.displayName = "TabButton";
