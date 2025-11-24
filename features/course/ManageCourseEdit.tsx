"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { JSX, useEffect, useMemo } from "react";

import { Card } from "@/components/ui/Card";
import { ScrollableTabs } from "@/components/ui/tabs/ScrollableTabs";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

import {
  BasicForm,
  CurriculumForm,
  InfoForm,
  MediaForm,
  PricingForm,
  SeoForm,
  SubmitForm,
} from "@/features/course/components/tab-forms";

import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { useTabNavigation } from "@/features/course/hooks/useTabNavigation";

import { CourseFormSchema } from "@/features/course/courseSchemas";

import type { Category } from "@/features/category/types";
import type { Course, CourseFormData, CourseMetadataFormatted } from "@/features/course/types";

import { useCourseAction } from "@/features/course/hooks/useCourseAction";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";

import { normalizeCourseToForm } from "@/features/course/lib/utils";
import { useCurriculumStore } from "@/features/course/stores/course-curriculum-store";

type props = {
  course: Course;
  categories: Category[];
  courseMetadata: CourseMetadataFormatted | null;
};

const TAB_COMPONENTS: Record<string, JSX.Element | null> = {
  basic: <BasicForm />,
  info: <InfoForm />,
  media: <MediaForm />,
  pricing: <PricingForm />,
  curriculum: <CurriculumForm />,
  seo: <SeoForm />,
  finish: null,
};

export default function ManageCourseEdit({ course, categories, courseMetadata }: props) {
  const formData = useCourseFormStore((state) => state.formData);
  const isDirty = useCourseFormStore((state) => state.isDirty);
  const isSubmitting = useCourseFormStore((state) => state.isSubmitting);

  const setCourseId = useCourseFormStore((s) => s.setCourseId);
  const setCategories = useCourseFormStore((s) => s.setCategories);
  const setCourseMetadata = useCourseFormStore((s) => s.setCourseMetadata);
  const setFormData = useCourseFormStore((s) => s.setFormData);

  const { update } = useCourseAction();
  const { handleApiErrors } = useHandleApiErrors<CourseFormData>();

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(CourseFormSchema) as any,
    defaultValues: formData,
    shouldUnregister: false,
  });

  const { activeTab, canGoNext, canGoPrev, goToNext, goToPrev, goToTab } = useTabNavigation(
    methods.trigger
  );

  const normalized = useMemo(() => normalizeCourseToForm(course), [course]);

  useEffect(() => {
    setFormData(normalized);
    setCategories(categories);
    setCourseMetadata(courseMetadata);
    setCourseId(course.id);

    if (course.course_modules) {
      const normalized = course.course_modules.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description || "",
        sort_order: m.sort_order,
        lessons: m.course_lessons || [],
        status: m.status,
        course_id: m.course_id,
      }));

      useCurriculumStore.getState().setSections(normalized);
    }

    methods.reset(normalized);
  }, [
    normalized,
    categories,
    courseMetadata,
    setFormData,
    setCategories,
    setCourseMetadata,
    methods,
  ]);

  const handleSubmitForm = methods.handleSubmit(async (data) => {
    try {
      const response = await update(course.id, data);

      if (!response.success) {
        toast.error("Failed to update course.");

        useCourseFormStore.setState({ activeTab: "finish" });
        return handleApiErrors(response, methods.setError);
      }

      toast.success("Course updated successfully.");

      methods.reset();
    } catch (err) {
      console.error(err);
      useCourseFormStore.setState({ activeTab: "finish" });
    } finally {
      useCourseFormStore.setState({ isSubmitting: false });
    }
  });

  const handleReset = () => {
    if (methods.formState.isDirty && !confirm("⚠️ Unsaved changes will be lost. Are you sure?"))
      return;

    methods.reset();
  };

  const handleNext = async () => await goToNext();
  const handleTabChange = async (tab: string) => await goToTab(tab);

  const renderContent = () => {
    if (activeTab === "finish") {
      return <SubmitForm onSubmit={handleSubmitForm} isSubmitting={isSubmitting} />;
    }

    return TAB_COMPONENTS[activeTab] || null;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmitForm}>
        <Card className="border-none bg-white shadow-lg">
          <Card.Header className="rounded-t-xl bg-gray-50 p-2">
            <ScrollableTabs
              tabs={COURSE_FORM_TABS}
              value={activeTab}
              onValueChange={handleTabChange}
              showScrollButtons={false}
              size="sm"
            />
          </Card.Header>

          <Card.Content className="mx-auto my-6 max-w-4xl p-6">
            <div className="min-h-[500px]">{renderContent()}</div>
          </Card.Content>

          <Card.Footer className="flex items-center justify-center gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4">
            {canGoPrev && (
              <Button
                type="button"
                variant="outlineGray"
                size="sm"
                onClick={goToPrev}
                disabled={isSubmitting}
              >
                <Icons.chevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            <div className="flex items-center gap-3">
              {activeTab !== "finish" && (
                <Button
                  type="button"
                  variant="outlineGray"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  <Icons.rotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
              {canGoNext && activeTab !== "finish" && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                  <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card.Footer>

          {isDirty && (
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
              Unsaved changes
            </div>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}
