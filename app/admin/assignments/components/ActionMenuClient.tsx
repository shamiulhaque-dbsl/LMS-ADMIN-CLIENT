"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface Action {
  id: string;
  label: string;
  type: "modal" | "link";
  href?: string;
  onClick?: () => void;
}

interface ActionDropdownProps {
  actions: Action[];
  onOpenModal?: (actionId: string) => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ actions, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <button onClick={() => setIsOpen(!isOpen)} className="rounded-full p-2 hover:bg-gray-100">
          <MoreVertical className="h-5 w-5" />
        </button>
      }
    >
      <div className="flex flex-col rounded-lg border bg-white shadow-md">
        {actions.map((action) => (
          <DropdownItem
            key={action.id}
            onClick={() => {
              setIsOpen(false);
              if (action.type === "modal" && onOpenModal) {
                onOpenModal(action.id);
              } else if (action.type === "link" && action.href) {
                router.push(action.href);
              }
            }}
          >
            {action.label}
          </DropdownItem>
        ))}
      </div>
    </Dropdown>
  );
};
