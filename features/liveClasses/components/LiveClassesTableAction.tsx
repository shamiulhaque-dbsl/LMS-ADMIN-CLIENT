"use client";

import { useState } from "react";
import { Icons } from "@/components/Icons";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import { LiveSession } from "../types";

/*
  # TODO:
  1. Add more actions as needed.
*/
export default function LiveClassesTableAction({ session }: { session: LiveSession }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-secondary p-1">
            <Icons.ellipsis className="text-gray-700" />
          </button>
        }
        className="w-52 space-y-2 rounded-md py-4 leading-tight"
        align="right"
      >
        <DropdownItem href={`/dashboard/courses/live-classes/${session.id}/edit`}>Edit Claas</DropdownItem>

      </Dropdown>
    </>
  );
}
