"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useModalStore } from "@/stores/modal-store";
import { useLessonAction } from "@/features/course/hooks/useLessonAction";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { ID, CourseLesson, LessonFormData } from "@/features/course/types";
import Text from "@/components/ui/Text";

// -------------------------
// Zod Schema for Lesson Form
// -------------------------
const lessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  contentType: z.string().min(1, "Content type is required"),
  contentUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
  duration: z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, "Duration must be in format MM:SS")
    .optional()
    .or(z.literal("")),
  isPreview: z.boolean().optional(),
  moduleId: z.number(),
});

export const LessonForm = ({
  moduleId,
  lesson,
  mode,
}: {
  moduleId: ID;
  lesson?: CourseLesson & { id?: ID };
  mode: "create" | "edit";
}) => {
  const lessonContentType = useCourseFormStore((s) => s.courseMetadata?.lessonContentType ?? []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title ?? "",
      description: lesson?.description,
      contentType: lesson?.content_type,
      contentUrl: lesson?.content_url ?? "",
      moduleId,
      notes: lesson?.notes ?? "",
      duration: lesson?.duration ?? "",
      isPreview: lesson?.is_preview,
    },
  });

  const { handleApiErrors } = useHandleApiErrors<CourseLesson>();
  const { create, update } = useLessonAction();
  const closeModal = useModalStore((s) => s.closeModal);

  const onSubmit = async (data: LessonFormData) => {
    try {
      const response =
        lesson && lesson.id ? await update(lesson.id, data) : await create({ ...data });
      if (!response?.success) {
        toast.error(mode === "edit" ? "Failed to update lesson." : "Failed to create lesson.");
        useCourseFormStore.setState({ activeTab: "curriculum" });
        return handleApiErrors(response, setError);
      }

      toast.success(
        mode === "edit" ? "Lesson updated successfully." : "Lesson created successfully."
      );
      reset();
      closeModal("lesson-modal");
    } catch (err) {
      console.error(err);
      useCourseFormStore.setState({ activeTab: "curriculum" });
    }
  };

  return (
    <form className="space-y-4">
      {errors.root?.message && <p className="text-red-500 text-center">{errors.root.message}</p>}
      <Input
        label="Title"
        id="title"
        required
        {...register("title")}
        error={errors.title?.message}
      />
      <Textarea label="Description" id="description" {...register("description")} />
      <div>
        <label className="label-base">Content Type</label>
        <select className="input-base" id="contentType" {...register("contentType")}>
          <option value="">Select a content type</option>
          {lessonContentType.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.contentType?.message && (
          <span className="error-text">{errors.contentType.message}</span>
        )}
      </div>
      <Input
        id="contentUrl"
        label="Content URL"
        placeholder="Content URL"
        {...register("contentUrl")}
        error={errors.contentUrl?.message}
      />
      <Textarea id="notes" label="Notes" placeholder="Notes" {...register("notes")} />
      <Input
        id="duration"
        label="Duration"
        placeholder="Duration (e.g., 05:30)"
        {...register("duration")}
        error={errors.duration?.message}
      />
      <div className="flex flex-col gap-2 text-sm">
        <Text as="span">Do you want to keep it free as a preview lesson?</Text>
        <label htmlFor="isPreview">
          <input type="checkbox" id="isPreview" {...register("isPreview")} /> Mark as free lesson
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => closeModal("section-modal")}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          variant="default"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting
            ? mode === "edit"
              ? "Saving..."
              : "Adding..."
            : mode === "edit"
              ? "Save Changes"
              : "Add Lesson"}
        </Button>
      </div>
    </form>
  );
};

LessonForm.displayName = "CourseLessonForm";
