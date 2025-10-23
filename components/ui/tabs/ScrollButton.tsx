import React from "react";

interface ScrollButtonProps {
  direction: "left" | "right";
  orientation: "horizontal" | "vertical";
  onClick: () => void;
  disabled?: boolean;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  orientation,
  onClick,
  disabled,
}) => {
  const isLeft = direction === "left";
  const label =
    orientation === "horizontal"
      ? isLeft
        ? "Scroll left"
        : "Scroll right"
      : isLeft
        ? "Scroll up"
        : "Scroll down";

  return (
    <button
      className={`absolute ${isLeft ? "left-0" : "right-0"} z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      style={{
        [orientation === "horizontal" ? "top" : isLeft ? "left" : "right"]: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <svg
        className={`h-4 w-4 text-gray-600 ${orientation === "vertical" ? "rotate-90" : ""} ${!isLeft ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};
