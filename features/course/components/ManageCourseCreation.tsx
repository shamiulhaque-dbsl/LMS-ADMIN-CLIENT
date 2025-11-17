"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { ScrollableTabs } from "@/components/ui/tabs/ScrollableTabs";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

import { BasicForm } from "@/features/course/components/tab-forms/BasicForm";
import { InfoForm } from "@/features/course/components/tab-forms/InfoForm";
import { MediaForm } from "@/features/course/components/tab-forms/MediaForm";
import { SeoForm } from "@/features/course/components/tab-forms/SeoForm";
import { PricingForm } from "@/features/course/components/tab-forms/PricingForm";
import { SubmitForm } from "@/features/course/components/tab-forms/SubmitForm";

import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { useTabNavigation } from "@/features/course/hooks/useTabNavigation";
import { ErrorSummary } from "@/features/course/components/ErrorSummary";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema } from "@/features/course/courseSchemas";

import type { Category } from "@/features/category/types";
import { CourseMetadataFormatted } from "../types";

type ManageCourseCreationProps = {
  categories: Category[];
  courseMetadata: CourseMetadataFormatted | null;
};

export default function ManageCourseCreation({
  categories,
  courseMetadata,
}: ManageCourseCreationProps) {
  const formData = useCourseFormStore((state) => state.formData);
  const setFormData = useCourseFormStore((state) => state.setFormData);
  const resetForm = useCourseFormStore((state) => state.resetForm);
  const isDirty = useCourseFormStore((state) => state.isDirty);
  const isSubmitting = useCourseFormStore((state) => state.isSubmitting);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange", // auto-clear errors when field is corrected
    resolver: zodResolver(CourseFormSchema) as any,
    defaultValues: formData,
    shouldUnregister: false,
  });

  const { activeTab, canGoNext, canGoPrev, goToNext, goToPrev, goToTab } = useTabNavigation(
    methods.trigger
  );

  // Sync RHF data to Zustand
  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFormData(values as any);
    });
    return () => subscription.unsubscribe();
  }, [methods, setFormData]);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      useCourseFormStore.getState().setIsSubmitting(true);

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          for (const [field, message] of Object.entries(result.errors)) {
            methods.setError(field as any, { type: "server", message: message as string });
          }
        }
        return;
      }

      alert("✅ Course created successfully!");
      resetForm();
      methods.reset(); // reset react-hook-form state
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      useCourseFormStore.getState().setIsSubmitting(false);
    }
  });

  const handleReset = () => {
    if (isDirty) {
      if (!confirm("⚠️ Unsaved changes will be lost. Are you sure?")) return;
    }
    resetForm();
    methods.reset();
  };

  const handleNext = async () => await goToNext();
  const handleTabChange = async (tab: string) => await goToTab(tab);

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicForm categories={categories} courseMetadata={courseMetadata} />;
      case "info":
        return <InfoForm />;
      case "media":
        return <MediaForm videoSources={courseMetadata?.videoDemoSources} />;
      case "pricing":
        return <PricingForm />;
      case "seo":
        return <SeoForm />;
      case "finish":
        return <SubmitForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
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
            <div className="min-h-[500px]">{renderTabContent()}</div>
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
