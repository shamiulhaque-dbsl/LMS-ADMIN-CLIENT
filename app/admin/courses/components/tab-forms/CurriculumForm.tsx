import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import Text from "@/components/ui/Text";
import { Grid } from "@/components/ui/grid";
import { SectionModal } from "@/admin/courses/components/modals/SectionModal";
import { LessonModal } from "@/admin/courses/components/modals/LessonModal";
import { useState } from "react";
import { useModalStore } from "@/stores/modal-store";
import SortSectionModal from "@/admin/courses/components/modals/section-sort/SortSectionModal";
import { ConfirmationModal } from "../modals/ConfirmationModal";

/*
  TODO:
  - Maintain single responsibility all of components
  - Maintain all modal more logically and clean
  - For create and update, use the same component
*/

export const CurriculumForm = () => {
  const [sections, setSections] = useState([
    {
      id: "1",
      title: "Getting Started With This Course",
      lessons: [
        { id: "1", title: "Introduction to the Course" },
        { id: "2", title: "How This Course Works" },
      ],
    },
    {
      id: "2",
      title: "Deep Dive into Concepts",
      lessons: [
        { id: "3", title: "Core Principles" },
        { id: "4", title: "Practical Examples" },
        { id: "5", title: "Assignment Overview" },
      ],
    },
    {
      id: "3",
      title: "Final Projects and Wrap Up",
      lessons: [
        { id: "6", title: "Capstone Project" },
        { id: "7", title: "Next Steps" },
      ],
    },
  ]);

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleAddSection = (data: any) => {
    setSections((prev) => [
      ...prev,
      { id: String(prev.length + 1), title: data.title, lessons: [] },
    ]);
  };

  const handleAddLesson = (data: any) => {
    console.log("Lesson saved:", data);
  };

  const handleDeleteClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    openModal("delete-modal");
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setSections((prev) => prev.filter((s) => s.id !== selectedSectionId));
    setIsDeleting(false);
    closeModal("delete-modal");
  };

  return (
    <div className="py-4">
      {/* Top Actions Buttons */}
      <div className="flex items-center justify-center flex-wrap gap-4">
        <Button
          size="sm"
          className="border border-gray-300 rounded-full"
          onClick={() => openModal("section-modal")}
        >
          <Icons.plus size={16} />
          <Text as="span" className="ml-2">
            Add Section
          </Text>
        </Button>
        <Button
          size="sm"
          className="border border-gray-300 rounded-full"
          onClick={() => openModal("lesson-modal")}
          sort-section-modal
        >
          <Icons.plus size={16} />
          <Text as="span" className="ml-2">
            Add Lesson
          </Text>
        </Button>
        <Button
          size="sm"
          className="border border-gray-300 rounded-full"
          onClick={() => openModal("sort-section-modal")}
        >
          <Icons.arrowDownUp size={16} />
          <Text as="span" className="ml-2">
            Sort Section
          </Text>
        </Button>
      </div>

      {/* Section List with Lessons List */}
      <div className="mt-12 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="bg-blue-200/20 p-4 rounded-md">
            {/* === Section Header === */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-8">
              <div className="text-sm space-x-1">
                <Text as="span">Section {sectionIndex + 1}:</Text>
                <Text as="span" className="font-semibold" variant="primary">
                  {section.title}
                </Text>
              </div>

              <div className="flex items-center justify-end flex-wrap gap-4">
                <Button
                  size="sm"
                  className="border border-gray-300 rounded-full space-x-2"
                  onClick={() => openModal("sort-section-modal")}
                >
                  <Icons.arrowDownUp size={16} />
                  <Text as="span">Sort Lesson</Text>
                </Button>
                <Button
                  size="sm"
                  className="border border-gray-300 rounded-full space-x-2"
                  onClick={() => openModal("section-modal")}
                >
                  <Icons.edit size={16} />
                  <Text as="span">Edit Section</Text>
                </Button>
                <Button
                  size="sm"
                  className="border border-gray-300 rounded-full space-x-2"
                  onClick={() => handleDeleteClick(section.id)}
                >
                  <Icons.trash size={16} />
                  <Text as="span">Delete Section</Text>
                </Button>
              </div>
            </div>

            {/* === Lessons === */}
            <Grid>
              {section.lessons.map((lesson, lessonIndex) => (
                <Card key={lesson.id} className="bg-white rounded-md border-none">
                  <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="text-sm space-x-1 leading-tight">
                      <Text as="span">Lesson {lessonIndex + 1}:</Text>
                      <Text as="span" variant="primary">
                        {lesson.title}
                      </Text>
                    </div>

                    <div className="flex items-center justify-end">
                      <Tooltip content="Edit Lesson">
                        <Button size="sm" className="px-2 text-indigo-400">
                          <Icons.fileText size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Resources Files">
                        <Button size="sm" className="px-2 text-indigo-700">
                          <Icons.edit size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete Lesson">
                        <Button
                          size="sm"
                          className="px-2 text-red-400"
                          onClick={() => handleDeleteClick(lesson.id)}
                        >
                          <Icons.trash size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </Grid>
          </div>
        ))}
      </div>

      {/* Modals */}
      <SectionModal />
      <LessonModal onSave={handleAddLesson} sectionOptions={sections} />
      <SortSectionModal />
      <ConfirmationModal
        id="delete-modal"
        type="delete"
        description="Delete this user permanently?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => closeModal("delete-modal")}
        isLoading={isDeleting}
      />
    </div>
  );
};

CurriculumForm.displayName = "CurriculumForm";
