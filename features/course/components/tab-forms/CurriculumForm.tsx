"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Grid } from "@/components/ui/grid";

import { Tooltip } from "@/components/ui/Tooltip";
import { SectionModal, LessonModal } from "@/features/course/components/modals";
import { useCurriculumStore } from "@/features/course/stores/course-curriculum-store";
import { useModalStore } from "@/stores/modal-store";
import { useConfirmDialog } from "@/stores/confirmDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCourseModuleAction } from "@/features/course/hooks/useCourseModuleAction";
import { useLessonAction } from "../../hooks/useLessonAction";

/*
  #TODO: 
  1. Modal id implement in centralized way not to repeat string literals.
  2. Implement resources file management for each lesson.
  3. Drag and drop functionality for sorting sections and lessons.
*/
export const CurriculumForm = () => {
  const sections = useCurriculumStore((s) => s.sections);
  const modal = useModalStore((s) => s.modals);
  const openModal = useModalStore((s) => s.openModal);
  const { openDialog } = useConfirmDialog();

  const router = useRouter();
  const { remove } = useCourseModuleAction();
  const { remove: removeLesson } = useLessonAction();

  const handleDelete = async (id: string | number, type = "section" as "section" | "lesson") => {
    try {
      const res = type === "section" ? await remove(id) : await removeLesson(id);
      if (res && !res.success) {
        throw new Error(res?.message);
      }
      toast.success(`${type === "section" ? "Section" : "Lesson"} deleted successfully`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          size="sm"
          variant="outlineGray"
          onClick={() => openModal("section-modal")}
        >
          <Icons.plus size={16} />
          <Text as="span" className="ml-2">
            Add Section
          </Text>
        </Button>

        <Button
          type="button"
          variant="outlineGray"
          size="sm"
          onClick={() => openModal("sort-section-modal")}
        >
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

              {section?.deleted_at &&
                <span className="text-red-500 text-sm">Deleted</span>
              }

              <div className={`flex justify-center items-center gap-4 ${section?.deleted_at && "hidden"}`}>
                <Button
                  size="sm"
                  type="button"
                  className="px-0"
                  onClick={() => openModal("lesson-modal", { moduleId: section.id })}
                >
                  <Icons.plus size={16} />
                  <Text as="span" className="ml-1">
                    Add Lesson
                  </Text>
                </Button>
                <Button
                  size="sm"
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
                  type="button"
                  className="px-0"
                  onClick={() =>
                    openDialog({
                      title: "Delete Section",
                      message: `Are you sure you want to delete "${section.title}"?`,
                      confirmText: "Yes, Delete",
                      cancelText: "Cancel",
                      onConfirm: () => handleDelete(section.id),
                    })
                  }
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
                    {lesson?.deleted_at &&
                      <span className="text-red-500 text-sm">Deleted</span>
                    }
                    <div className={`flex items-center justify-end ${lesson?.deleted_at && "hidden"}`}>
                      {/* <Tooltip content="Resources Files">
                        <Button
                          type="button"
                          size="sm"
                          className="px-2 text-indigo-400"
                          onClick={() => openModal("lesson-modal", { sectionIndex, lessonIndex })}
                        >
                          <Icons.fileText size={16} />
                        </Button>
                      </Tooltip> */}
                      <Tooltip content="Edit Lesson">
                        <Button
                          type="button"
                          size="sm"
                          className="px-2 text-indigo-700"
                          onClick={() =>
                            openModal("lesson-modal", { moduleId: section.id, lesson })
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
                            openDialog({
                              title: "Delete Lesson",
                              message: `Are you sure you want to delete "${lesson.title}"?`,
                              confirmText: "Yes, Delete",
                              cancelText: "Cancel",
                              onConfirm: () => handleDelete(lesson.id, "lesson"),
                            })
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

      {/* Lesson Modal */}
      {modal["lesson-modal"] && <LessonModal />}
    </div>
  );
};

CurriculumForm.displayName = "CurriculumForm";
