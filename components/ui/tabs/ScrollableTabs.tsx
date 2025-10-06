"use client";

import React, {
  useRef,
  useCallback,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ScrollableTabsProps, TabsRef } from "./tabs.type";
import { useTabsState } from "./hooks/useTabsState";
import { useScrollState } from "./hooks/useScrollState";
import { findNextValidTabIndex } from "./utils/tabs.utils";
import { TabButton } from "./TabButton";
import { ScrollButton } from "./ScrollButton";

export const ScrollableTabs = forwardRef<TabsRef, ScrollableTabsProps>(
  (
    {
      tabs,
      value: controlledValue,
      onValueChange,
      defaultValue,
      className = "",
      tabClassName = "",
      activeTabClassName = "",
      orientation = "horizontal",
      scrollable = true,
      showScrollButtons = true,
      variant = "default",
      size = "md",
      fullWidth = false,
      centered = false,
      disabled = false,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    ref
  ) => {
    const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    const { value, handleTabChange } = useTabsState(
      tabs,
      controlledValue,
      onValueChange,
      defaultValue,
      disabled
    );

    const {
      showLeftButton,
      showRightButton,
      scrollContainerRef,
      checkScroll,
      handleScroll,
      scroll,
      scrollToTab,
    } = useScrollState(scrollable, orientation);

    const focusTab = useCallback((tabId: string) => {
      const tabElement = tabsRef.current.get(tabId);
      tabElement?.focus();
    }, []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent, tabId: string) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === tabId);

        const directionMap = {
          ArrowRight: orientation === "horizontal" ? "next" : undefined,
          ArrowLeft: orientation === "horizontal" ? "prev" : undefined,
          ArrowDown: orientation === "vertical" ? "next" : undefined,
          ArrowUp: orientation === "vertical" ? "prev" : undefined,
          Home: "first",
          End: "last",
        } as const;

        const direction = directionMap[event.key as keyof typeof directionMap];

        if (direction) {
          event.preventDefault();
          const newIndex = findNextValidTabIndex(tabs, currentIndex, direction);
          if (newIndex !== currentIndex) {
            focusTab(tabs[newIndex].id);
          }
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleTabChange(tabId);
        }
      },
      [tabs, orientation, handleTabChange, focusTab]
    );

    const setTabRef = useCallback((tabId: string, el: HTMLButtonElement | null) => {
      if (el) {
        tabsRef.current.set(tabId, el);
      } else {
        tabsRef.current.delete(tabId);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        scrollToTab: (tabId: string) => scrollToTab(tabId, tabsRef.current),
        getActiveTab: () => value,
        focusTab,
      }),
      [scrollToTab, value, focusTab]
    );

    useEffect(() => {
      checkScroll();
      const container = scrollContainerRef.current;
      if (!container) return;

      container.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", checkScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }, [checkScroll, handleScroll]);

    useEffect(() => {
      scrollToTab(value, tabsRef.current);
    }, [value, scrollToTab]);

    const containerClasses = useMemo(() => {
      const base = orientation === "horizontal" ? "flex flex-col" : "flex flex-row";
      return `${base} ${className}`;
    }, [orientation, className]);

    const tabsContainerClasses = useMemo(() => {
      let classes = orientation === "horizontal" ? "flex flex-row" : "flex flex-col min-h-0";

      if (scrollable) {
        classes += orientation === "horizontal" ? " overflow-x-auto" : " overflow-y-auto";
        classes += " scrollbar-hide";
        if (showScrollButtons) {
          classes += orientation === "horizontal" ? " mx-8 sm:mx-10" : " my-8 sm:my-10";
        }
      } else if (orientation === "horizontal") {
        classes += fullWidth ? " w-full" : "";
        if (centered) classes += " justify-center";
      }

      if (variant === "bordered") {
        classes +=
          orientation === "horizontal" ? " border-b border-gray-200" : " border-r border-gray-200";
      }

      return classes;
    }, [orientation, scrollable, showScrollButtons, fullWidth, centered, variant]);

    if (!tabs.length) return null;

    return (
      <div
        className={containerClasses}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <div className="relative flex items-center">
          {scrollable && showScrollButtons && showLeftButton && (
            <ScrollButton
              direction="left"
              orientation={orientation}
              onClick={() => scroll("left")}
              disabled={disabled}
            />
          )}

          <div ref={scrollContainerRef} className={tabsContainerClasses}>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={tab.id === value}
                variant={variant}
                size={size}
                orientation={orientation}
                fullWidth={fullWidth}
                tabClassName={tabClassName}
                activeTabClassName={activeTabClassName}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                tabRef={(el) => setTabRef(tab.id, el)}
              />
            ))}
          </div>

          {scrollable && showScrollButtons && showRightButton && (
            <ScrollButton
              direction="right"
              orientation={orientation}
              onClick={() => scroll("right")}
              disabled={disabled}
            />
          )}
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
        `}</style>
      </div>
    );
  }
);

ScrollableTabs.displayName = "ScrollableTabs";
