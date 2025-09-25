"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "right" | "left";
  className?: string;
}

export function Dropdown({
  isOpen,
  onClose,
  trigger,
  children,
  align = "right",
  className = "",
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Calculate available space below and right
      const spaceBelow = window.innerHeight - (rect.bottom + scrollY);
      const spaceRight = window.innerWidth - (rect.right + scrollX);

      // Default dropdown width
      const dropdownWidth = 200;

      let top = rect.bottom + scrollY + 4;
      let left = align === "right" ? rect.right - dropdownWidth + scrollX : rect.left + scrollX;

      // If there's not enough space below, position above
      if (spaceBelow < 200 && dropdownRef.current) {
        top = rect.top + scrollY - 4 - dropdownRef.current.offsetHeight;
      }

      // If there's not enough space on the right, align left
      if (spaceRight < dropdownWidth && align === "right") {
        left = rect.left + scrollX;
      }

      setDropdownStyle({ top, left });
    }
  }, [isOpen, align]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
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
    <>
      <div ref={triggerRef} className="inline-block">
        {trigger}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${dropdownStyle.top}px`,
              left: `${dropdownStyle.left}px`,
              width: "200px",
              zIndex: 9999,
            }}
            className={`bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 ${className}`}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

export function DropdownItem({
  children,
  onClick,
  href,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
    >
      {children}
    </button>
  );
}
