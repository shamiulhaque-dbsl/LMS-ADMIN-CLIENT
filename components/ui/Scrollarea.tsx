import React, { useEffect, useRef, useState } from "react";

// Custom hook to debounce resize events
const useDebouncedResize = (callback: () => void, delay: number): void => {
  useEffect(() => {
    const handleResize = (): void => callback();
    const debouncedResize = debounce(handleResize, delay);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [callback, delay]);
};

// Debounce function implementation with proper types
const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): ((...args: T) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: T): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);

    // Check if content is scrollable (vertical or horizontal)
    const checkScrollable = (): void => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      const isScrollableVertical = scrollContainer.scrollHeight > scrollContainer.clientHeight;
      const isScrollableHorizontal = scrollContainer.scrollWidth > scrollContainer.clientWidth;
      setIsScrollable(isScrollableVertical || isScrollableHorizontal);
    };

    // Use debounced resize handler
    useDebouncedResize(checkScrollable, 200);

    // Initial check
    useEffect(() => {
      checkScrollable();
    }, []);

    return (
      <div
        ref={(element) => {
          // Handle both the forwarded ref and the local ref
          if (ref) {
            if (typeof ref === "function") {
              ref(element);
            } else {
              ref.current = element;
            }
          }
          scrollContainerRef.current = element;
        }}
        className={`relative overflow-hidden ${className ?? ""}`}
        {...props}
      >
        <div className="h-full w-full overflow-auto">{children}</div>
        {isScrollable && <CustomScrollBar orientation="vertical" />}
        {isScrollable && <CustomScrollBar orientation="horizontal" />}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

// Custom Scrollbar component
const CustomScrollBar: React.FC<{ orientation: "vertical" | "horizontal" }> = React.memo(
  ({ orientation }) => {
    return (
      <div
        className={`
          absolute ${
            orientation === "vertical"
              ? "bottom-0 right-0 top-0 w-2.5"
              : "bottom-0 left-0 right-0 h-2.5"
          }
          rounded-full bg-gray-400 opacity-70 transition-opacity duration-300 ease-in-out
          ${orientation === "vertical" && "cursor-pointer"}
          ${orientation === "horizontal" && "cursor-pointer"}
        `}
      >
        <div
          className={`
            ${
              orientation === "vertical"
                ? "h-1/2 w-full rounded-full bg-gray-600"
                : "h-full w-1/2 rounded-full bg-gray-600"
            }
            transition-all duration-300 ease-in-out
          `}
        />
      </div>
    );
  }
);

CustomScrollBar.displayName = "CustomScrollBar";

export { ScrollArea, CustomScrollBar };
