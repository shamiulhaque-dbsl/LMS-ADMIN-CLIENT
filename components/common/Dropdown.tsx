"use client";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/tailwind-utils";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "right" | "left";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  trigger,
  children,
  align = "right",
  className = "",
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: align === "right" ? rect.right + window.scrollX : rect.left + window.scrollX,
      });
    } else if (!isOpen) {
      setCoords(null);
    }
  }, [isOpen, align]);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={triggerRef} className="inline-block">
      {trigger}
      {isOpen &&
        coords &&
        createPortal(
          <div
            role="menu"
            className={cn(
              "absolute z-[9999] mt-2 rounded-xl bg-white shadow-lg ring-1 ring-black/10 transition-all duration-200 ease-in-out",
              className
            )}
            style={{
              position: "absolute",
              top: coords.top,
              left: align === "right" ? coords.left - 208 /* adjust width */ : coords.left,
              minWidth: "200px",
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export const DropdownItem: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}> = ({ children, onClick, href }) => {
  if (href) {
    return (
      <a
        href={href}
        role="menuitem"
        className="block w-full px-4 text-sm text-gray-600 hover:text-gray-800 rounded-lg"
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className="block w-full px-4 text-sm text-gray-600 hover:text-gray-800 rounded-lg text-left"
    >
      {children}
    </button>
  );
};
