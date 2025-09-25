"use client";

import React, { ReactNode, useState, useRef } from "react";
import clsx from "clsx";

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = "top" }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 150);
  };
  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Tooltip position classes
  const placementClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Arrow classes per placement
  const arrowClasses: Record<string, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900",
  };

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute z-50 w-max max-w-xs px-3 py-1.5 text-sm text-white bg-gray-900 rounded-lg shadow-lg transition-all duration-200 ease-out transform opacity-100 scale-100",
            placementClasses[placement]
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={clsx(
              "absolute w-0 h-0 border-8 border-transparent",
              arrowClasses[placement]
            )}
          />
        </div>
      )}
    </div>
  );
};
