"use client";

import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Grid } from "@/components/ui/grid";
import { SortableSectionItem } from "./SortableSectionItem";
import type { Section } from "../types";

export function SortableSectionList({
  sections,
  onDragEnd,
}: {
  sections: Section[];
  onDragEnd: (event: DragEndEvent) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // movement (in px) before drag starts — improves UX
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // delay in ms before drag starts
        tolerance: 5, // small movement tolerance
      },
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <Grid gap={3}>
          {sections.map((section, idx) => (
            <SortableSectionItem key={section.id} section={section} index={idx} />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}
