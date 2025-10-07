"use client";

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
} from "@/components/ui/modal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SortableSectionList } from "./SortableSectionList";
import { useSectionSort } from "./useSectionSort";
import type { Section } from "../types";

export default function SortSectionModal({ initialSections }: { initialSections?: Section[] }) {
  const { sections, dirty, saving, handleSave, handleDragEnd } = useSectionSort({
    initialSections,
  });

  return (
    <Modal id="sort-section-modal">
      <ModalOverlay id="sort-section-modal" />
      <ModalContent id="sort-section-modal" size="2xl">
        <ModalClose id="sort-section-modal" />
        <ModalHeader className="border-b">
          <ModalTitle>Sort sections</ModalTitle>
        </ModalHeader>
        <ModalBody className="rounded-md">
          <Card className="bg-gray-400/20 p-4 border-none">
            <Card.Header className="text-right">
              <Button variant="outlineGray" onClick={handleSave} disabled={!dirty || saving}>
                {saving ? "Saving..." : "Update Sorting"}
              </Button>
            </Card.Header>

            <SortableSectionList sections={sections} onDragEnd={handleDragEnd} />
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
