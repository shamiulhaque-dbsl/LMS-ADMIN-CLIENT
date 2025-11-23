"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { Grid } from "@/components/ui/grid";
import { Icons } from "@/components/Icons";

import { SectionModal } from "@/features/course/components/modals/SectionModal";
import { LessonModal } from "@/features/course/components/modals/LessonModal";
import SortSectionModal from "@/features/course/components/modals/section-sort/SortSectionModal";
import { ConfirmationModal } from "@/features/course/components/modals/ConfirmationModal";

import { useModalStore } from "@/stores/modal-store";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { CourseFormSchema } from "@/features/course/courseSchemas";
import { useCurriculumStore } from "@/features/course/stores/course-curriculum-store";
import { useCourseModuleAction } from "@/features/course/hooks/useCourseModuleAction";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";

type FormValues = {
  sections: {
    id: string;
    title: string;
    description?: string;
    status?: string;
    lessons: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
  newSectionTitle?: string;
  newSectionDescription?: string;
  newSectionStatus?: string;
};

export const CurriculumForm = () => {
  const setFormData = useCourseFormStore((s) => s.setFormData);
  const sectionsStore = useCurriculumStore((s) => s.sections);
  const courseId = useCourseFormStore((state) => state.courseId);

  const { create, update } = useCourseModuleAction();
  const { handleApiErrors } = useHandleApiErrors<FormValues>();
  const router = useRouter();

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(CourseFormSchema) as any,
    defaultValues: { sections: [] },
  });
  const { control, watch, reset, setValue } = methods;

  const sections = useFieldArray({
    control,
    name: "sections",
  });

  const modal = useModalStore((s) => s.modals);
  const payloads = useModalStore((s) => s.payloads);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  // Sync RHF sections to main course form store
  useEffect(() => {
    const subscription = watch((values) => {
      setFormData({ sections: values.sections });
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  // Reset RHF when store sections are loaded (for editing existing course)
  useEffect(() => {
    if (sectionsStore.length > 0) {
      reset({ sections: sectionsStore });
    }
  }, [sectionsStore, reset]);

  // Section handlers
  const handleAddSection = async (data: {
    title: string;
    description?: string;
    status?: string;
  }) => {
    try {
      const response = await create({ ...data, course_id: courseId });

      if (!response.success) {
        toast.error("Failed to create section.");

        useCourseFormStore.setState({ activeTab: "curriculum" });
        return handleApiErrors(response, methods.setError);
      }

      toast.success("Section created successfully.");
      router.refresh();
      methods.reset();
    } catch (err) {
      console.error(err);
      useCourseFormStore.setState({ activeTab: "curriculum" });
    } finally {
      useCourseFormStore.setState({ isSubmitting: false });
      closeModal("section-modal");
    }
  };

  const handleEditSection = async (
    index: number,
    data: { title: string; description?: string; status?: string }
  ) => {
    try {
      const response = await update(data?.id, data);

      if (!response.success) {
        toast.error("Failed to update course.");

        useCourseFormStore.setState({ activeTab: "curriculum" });
        return handleApiErrors(response, methods.setError);
      }

      toast.success("Course updated successfully.");

      methods.reset();
    } catch (err) {
      console.error(err);
      useCourseFormStore.setState({ activeTab: "curriculum" });
    } finally {
      useCourseFormStore.setState({ isSubmitting: false });
      closeModal("section-modal");
    }
  };

  return (
    <FormProvider {...methods}>
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
          {sections.fields.length === 0 && (
            <Text as="span" className="text-gray-500 text-sm">
              No sections yet.
            </Text>
          )}

          {sections.fields.map((section, sectionIndex) => (
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
        {modal["section-modal"] && (
          <SectionModal
            onSave={(data) =>
              payloads["section-modal"]?.sectionIndex != null
                ? handleEditSection(payloads["section-modal"].sectionIndex, data)
                : handleAddSection(data)
            }
          />
        )}
      </div>
    </FormProvider>
  );
};

CurriculumForm.displayName = "CurriculumForm";
