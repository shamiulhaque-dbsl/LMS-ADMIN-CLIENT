import { MouseEventHandler } from "react";

interface TabProps {
  label: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Tab({ label, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
        active ? "bg-web-primary text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
