import { useState, useCallback, useRef, useEffect } from "react";

export const useScrollState = (scrollable: boolean, orientation: "horizontal" | "vertical") => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current || !scrollable || orientation === "vertical") return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftButton(scrollLeft > 1);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  }, [scrollable, orientation]);

  const handleScroll = useCallback(() => {
    if (!isScrolling) setIsScrolling(true);

    checkScroll();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [checkScroll, isScrolling]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.5;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }, []);

  const scrollToTab = useCallback(
    (tabId: string, tabsRef: Map<string, HTMLButtonElement>) => {
      const tabElement = tabsRef.get(tabId);
      if (!tabElement || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;

      if (orientation === "horizontal") {
        const scrollLeft =
          tabElement.offsetLeft - container.clientWidth / 2 + tabElement.clientWidth / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      } else {
        const scrollTop =
          tabElement.offsetTop - container.clientHeight / 2 + tabElement.clientHeight / 2;
        container.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: "smooth",
        });
      }
    },
    [orientation]
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    showLeftButton,
    showRightButton,
    scrollContainerRef,
    checkScroll,
    handleScroll,
    scroll,
    scrollToTab,
  };
};
