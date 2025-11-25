"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useCourseModuleAction } from "@/features/course/hooks/useCourseModuleAction";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { CourseModule } from "@/features/course/types";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/modal-store";

export const ModuleForm = ({
  section,
  mode,
}: {
  section?: CourseModule & { id?: string };
  mode: "create" | "edit";
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<CourseModule>({
    defaultValues: {
      title: section?.title ?? "",
      description: section?.description ?? "",
      status: section?.status ?? undefined,
    },
  });

  const router = useRouter();
  const courseId = useCourseFormStore((s) => s.courseId);
  const { handleApiErrors } = useHandleApiErrors<CourseModule>();
  const { create, update } = useCourseModuleAction();
  const sectionStatus = useCourseFormStore((s) => s.courseMetadata?.moduleStatus ?? []);
  const closeModal = useModalStore((s) => s.closeModal);

  const onSubmit = async (data: CourseModule) => {
    try {
      const response =
        section && section.id
          ? await update(section.id, data)
          : await create({ ...data, course_id: courseId });

      if (!response?.success) {
        toast.error(mode === "edit" ? "Failed to update section." : "Failed to create section.");
        useCourseFormStore.setState({ activeTabEdit: "curriculum" });
        return handleApiErrors(response, setError);
      }

      toast.success(
        mode === "edit" ? "Section updated successfully." : "Section created successfully."
      );

      reset();
      router.refresh();
      closeModal("section-modal");
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
        {...register("title", {
          required: "This is required",
        })}
        error={errors.title?.message}
      />

      <Textarea label="Description" id="description" {...register("description")} />

      <div>
        <label className="label-base">Status</label>
        <select className="input-base" id="status" {...register("status")}>
          <option value="">Select a status</option>
          {sectionStatus.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
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
            : "Add Section"}
      </Button>
    </form>
  );
};

ModuleForm.displayName = "CourseModuleForm";
