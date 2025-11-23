"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Grid } from "@/components/ui/grid";

import { Tooltip } from "@/components/ui/Tooltip";
import { SectionModal } from "@/features/course/components/modals/SectionModal";
import { useCurriculumStore } from "@/features/course/stores/course-curriculum-store";
import { useModalStore } from "@/stores/modal-store";

export const CurriculumForm = () => {
  const sections = useCurriculumStore((s) => s.sections);
  const modal = useModalStore((s) => s.modals);
  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className="py-4">
      <div className="flex justify-center gap-4">
        <Button type="button" size="sm" onClick={() => openModal("section-modal")}>
          <Icons.plus size={16} />
          <Text as="span" className="ml-2">
            Add Section
          </Text>
        </Button>

        <Button type="button" size="sm" onClick={() => openModal("sort-section-modal")}>
          <Icons.arrowDownUp size={16} />
          <Text as="span" className="ml-2">
            Sort Section
          </Text>
        </Button>
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-6">
        {sections.length === 0 && (
          <Text as="span" className="text-gray-500 text-sm">
            No sections yet.
          </Text>
        )}

        {sections.map((section, sectionIndex) => (
          <Card key={section.id} className="rounded-md bg-blue-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <Text as="span" className="font-semibold">
                Section {sectionIndex + 1}: {section.title || "Untitled"}
              </Text>

              <div className="flex justify-center items-center gap-4">
                <Button
                  type="button"
                  className="px-0"
                  onClick={() => openModal("lesson-modal", { sectionIndex })}
                >
                  <Icons.plus size={16} />
                  <Text as="span" className="ml-1">
                    Add Lesson
                  </Text>
                </Button>
                <Button
                  type="button"
                  className="px-0"
                  onClick={() => openModal("section-modal", { section })}
                >
                  <Icons.edit size={16} />
                  <Text as="span" className="ml-1">
                    Edit
                  </Text>
                </Button>

                <Button
                  size="sm"
                  className="px-0"
                  onClick={() => openModal("delete-modal", { sectionIndex })}
                >
                  <Icons.trash size={16} />
                  <Text as="span" className="ml-1">
                    Delete
                  </Text>
                </Button>
              </div>
            </div>

            {/* Lessons */}
            <Grid>
              {section.lessons.length === 0 && (
                <Text as="span" className="text-gray-500 text-sm">
                  No lessons yet.
                </Text>
              )}

              {section.lessons.map((lesson, lessonIndex) => (
                <Card key={lesson.id} className="bg-white p-3">
                  <div className="flex justify-between items-center">
                    <Text as="span">
                      Lesson {lessonIndex + 1}: {lesson.title || "Untitled"}{" "}
                    </Text>
                    <div className="flex items-center justify-end">
                      <Tooltip content="Edit Lesson">
                        <Button
                          type="button"
                          size="sm"
                          className="px-2 text-indigo-400"
                          onClick={() => openModal("lesson-modal", { sectionIndex, lessonIndex })}
                        >
                          <Icons.fileText size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Resources Files">
                        <Button
                          type="button"
                          size="sm"
                          className="px-2 text-indigo-700"
                          onClick={() =>
                            openModal("confirm-delete-lesson", { sectionIndex, lessonIndex })
                          }
                        >
                          <Icons.edit size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete Lesson">
                        <Button
                          type="button"
                          size="sm"
                          className="px-2 text-red-400"
                          onClick={() =>
                            openModal("confirm-delete-lesson", { sectionIndex, lessonIndex })
                          }
                        >
                          <Icons.trash size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          </Card>
        ))}
      </div>

      {/* Section Modal */}
      {modal["section-modal"] && <SectionModal />}
    </div>
  );
};

CurriculumForm.displayName = "CurriculumForm";
