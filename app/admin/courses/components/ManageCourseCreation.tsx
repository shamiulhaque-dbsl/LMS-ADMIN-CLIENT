"use client";

import { Card } from "@/components/ui/Card";
import { ScrollableTabs } from "@/components/ui/tabs/ScrollableTabs";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import { BasicForm } from "@/app/admin/courses/components/tab-forms/BasicForm";
import { InfoForm } from "@/app/admin/courses/components/tab-forms/InfoForm";
import { MediaForm } from "@/app/admin/courses/components/tab-forms/MediaForm";
import { SeoForm } from "@/app/admin/courses/components/tab-forms/SeoForm";
import { PricingForm } from "@/app/admin/courses/components/tab-forms/PricingForm";
import { SubmitForm } from "@/app/admin/courses/components/tab-forms/SubmitForm";
import { COURSE_FORM_TABS } from "@/admin/courses/lib/constant";
import { useCourseFormStore } from "@/admin/courses/store/useCourseFormStore";
import { useTabNavigation } from "@/admin/courses/hooks/useTabNavigation";
import { ErrorSummary } from "@/admin/courses/components/ErrorSummary";

export default function ManageCourseCreation() {
  const resetForm = useCourseFormStore((state) => state.resetForm);
  const isSubmitting = useCourseFormStore((state) => state.isSubmitting);
  const isDirty = useCourseFormStore((state) => state.isDirty);
  const validationErrors = useCourseFormStore((state) => state.validationErrors);

  const { activeTab, currentIndex, canGoNext, canGoPrev, goToNext, goToPrev, goToTab } =
    useTabNavigation();

  const handleSubmit = async () => {
    alert("✅ Course created successfully! 🎉");
    return;
  };

  const handleReset = () => {
    if (isDirty) {
      const confirmed = confirm(
        "⚠️ Are you sure you want to reset?\n\nAll unsaved changes will be lost."
      );
      if (!confirmed) return;
    }
    resetForm();
    alert("Form has been reset.");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicForm />;
      case "info":
        return <InfoForm />;
      case "media":
        return <MediaForm />;
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
    <Card className="bg-white border-none shadow-lg">
      {/* Tab Header */}
      <Card.Header className="rounded-t-xl p-2 bg-gray-50">
        <ScrollableTabs
          tabs={COURSE_FORM_TABS.filter((tab) => !tab.showInEdit)}
          value={activeTab}
          onValueChange={goToTab}
          showScrollButtons={false}
          size="sm"
        />
      </Card.Header>

      {/* Validation Errors Summary */}
      {Object.keys(validationErrors).length > 0 && activeTab !== "finish" && (
        <ErrorSummary errors={validationErrors} />
      )}

      {/* Tab Content */}
      <Card.Content className="my-6 max-w-4xl mx-auto p-6">
        <div className="min-h-[500px]">{renderTabContent()}</div>
      </Card.Content>

      {/* Bottom Navigation */}
      <Card.Footer className="flex items-center justify-center gap-4 border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div>
          {canGoPrev && (
            <Button
              variant="outlineGray"
              size="sm"
              onClick={goToPrev}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              <Icons.chevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* {isDirty && activeTab !== "finish" && (
            <Button
              variant="outlineGray"
              size="sm"
              onClick={handleReset}
              disabled={isSubmitting}
              className="hidden sm:flex"
            >
              <Icons.target className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )} */}
          {activeTab !== "finish" && (
            <Button
              variant="outlineGray"
              size="sm"
              onClick={handleReset}
              disabled={isSubmitting}
              className="hidden sm:flex"
            >
              <Icons.rotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}

          {canGoNext && activeTab !== "finish" && (
            <Button
              variant="outlineGray"
              size="sm"
              onClick={goToNext}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              Next
              <Icons.chevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card.Footer>

      {/* Unsaved changes indicator */}
      {isDirty && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full border border-amber-300">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Unsaved changes
        </div>
      )}
    </Card>
  );
}
