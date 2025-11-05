import { useState, useCallback } from "react";
import type { Section } from "../types";

function arrayMove<T>(arr: T[], from: number, to: number) {
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function useSectionSort({
  initialSections,
  onSave,
  onClose,
}: {
  initialSections?: Section[];
  onSave?: (next: Section[]) => Promise<void> | void;
  onClose?: () => void;
}) {
  const [sections, setSections] = useState<Section[]>(
    initialSections ?? [
      { id: "sec-1", title: "Getting Started With This Course" },
      { id: "sec-2", title: "Introduction & Setup" },
      { id: "sec-3", title: "First Lesson: Basics" },
      { id: "sec-4", title: "First Lesson: Basics" },
      { id: "sec-5", title: "First Lesson: Basics" },
      { id: "sec-6", title: "First Lesson: Basics" },
      { id: "sec-7", title: "First Lesson: Basics" },
      { id: "sec-8", title: "First Lesson: Basics" },
      { id: "sec-9", title: "First Lesson: Basics" },
      { id: "sec-10", title: "First Lesson: Basics" },
      { id: "sec-11", title: "First Lesson: Basics" },
      { id: "sec-12", title: "First Lesson: Basics" },
      { id: "sec-13", title: "First Lesson: Basics" },
    ]
  );
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const next = arrayMove(sections, oldIndex, newIndex);
      setSections(next);
      setDirty(true);
    },
    [sections]
  );

  const handleSave = useCallback(async () => {
    if (!dirty) return onClose?.();
    try {
      setSaving(true);
      if (onSave) await onSave(sections);
      else await new Promise((r) => setTimeout(r, 500));
      setDirty(false);
      onClose?.();
    } catch (err) {
      console.error("Failed to save sorting", err);
    } finally {
      setSaving(false);
    }
  }, [dirty, sections, onSave, onClose]);

  return { sections, dirty, saving, handleSave, handleDragEnd };
}
