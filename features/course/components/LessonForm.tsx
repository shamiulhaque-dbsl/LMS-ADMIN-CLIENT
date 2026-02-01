"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useModalStore } from "@/stores/modal-store";
import { useLessonAction } from "@/features/course/hooks/useLessonAction";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { ID, CourseLesson, LessonFormData } from "@/features/course/types";
import Text from "@/components/ui/Text";

/*
  #TODO:
  1. Validation control for each field using zod schema.
  2. Content type wise dynamic fields display for content url. Like video upload for video type, pdf upload for pdf type, youtube link for youtube type etc., 
  3. Duration field use a time picker instead of text input.Like mm:ss format control.
  4. Use a rich text editor for notes & Description field.
*/
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
  const courseId = useCourseFormStore((s) => s.courseId);
  const router = useRouter();
  const { handleApiErrors } = useHandleApiErrors<LessonFormData>();
  const { create, update } = useLessonAction();
  const closeModal = useModalStore((s) => s.closeModal);

  const onSubmit = async (data: LessonFormData) => {
    try {
      const response =
        lesson && lesson.id ? await update(lesson.id, data) : await create({ ...data, course_id: courseId });
      if (!response?.success) {
        toast.error(mode === "edit" ? "Failed to update lesson." : "Failed to create lesson.");
        useCourseFormStore.setState({ activeTabEdit: "curriculum" });
        return handleApiErrors(response, setError);
      }

      toast.success(
        mode === "edit" ? "Lesson updated successfully." : "Lesson created successfully."
      );

      reset();
      router.refresh();
      closeModal("lesson-modal");
    } catch (err) {
      console.error(err);
      useCourseFormStore.setState({ activeTabEdit: "curriculum" });
    }
  };

  return (
    <form className="space-y-4">
      {errors.root?.message && <p className="text-red-500 text-center">{errors.root.message}</p>}
      <Input
        label="Title"
        id="title"
        required
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />
      <Textarea label="Description" id="description" {...register("description")} />
      <div>
        <label className="label-base">Content Type</label>
        <select
          className="input-base"
          id="contentType"
          {...register("contentType", { required: "Content type is required" })}
        >
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
        {...register("contentUrl", {
          validate: (value) => {
            if (!value) return true;
            try {
              new URL(value);
              return true;
            } catch {
              return "Enter a valid URL";
            }
          },
        })}
        error={errors.contentUrl?.message}
      />
      <Textarea id="notes" label="Notes" placeholder="Notes" {...register("notes")} />
      <Input
        id="duration"
        label="Duration"
        placeholder="Duration (e.g., 05:30)"
        {...register("duration", {
          validate: (value) => {
            if (!value) return true;
            return /^\d{1,2}:\d{2}$/.test(value) ? true : "Duration must be in format MM:SS";
          },
        })}
        error={errors.duration?.message}
      />
      <div className="flex flex-col gap-2 text-sm">
        <Text as="span">Do you want to keep it free as a preview lesson?</Text>
        <label htmlFor="isPreview">
          <input type="checkbox" id="isPreview" {...register("isPreview")} /> Mark as free lesson
        </label>
      </div>

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
    </form>
  );
};

LessonForm.displayName = "CourseLessonForm";
