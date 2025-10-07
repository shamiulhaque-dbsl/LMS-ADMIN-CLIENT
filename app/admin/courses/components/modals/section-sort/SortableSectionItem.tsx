import React from "react";
import { Card } from "@/components/ui/Card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Section } from "../types";

export function SortableSectionItem({ section, index }: { section: Section; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 60 : undefined,
  };

  return (
    <Card
      ref={setNodeRef as any}
      className={`bg-white rounded-md border-none shadow-sm p-0 overflow-hidden ${isDragging ? "opacity-90" : ""}`}
      style={style}
      aria-label={section.title}
      {...attributes}
    >
      <Card.Content className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
          <div className="text-sm font-medium leading-tight">{section.title}</div>
        </div>

        <div {...listeners} className="cursor-grab p-2 rounded-md hover:bg-gray-50" aria-hidden>
          <GripVertical size={18} />
        </div>
      </Card.Content>
    </Card>
  );
}
