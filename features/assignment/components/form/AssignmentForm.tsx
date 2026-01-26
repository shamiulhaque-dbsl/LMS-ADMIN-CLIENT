"use client";
import { Input } from "@/components/ui/input";
import Text from "@/components/ui/Text";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { AssignmentCreateFormValues } from "../../types/type-matric";
import type { Course } from "@/features/course/types";
import { useHandleAssignment } from "../../hooks/useHandleAssignment";
import { useForm, useWatch } from "react-hook-form";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import Image from "next/image";
import { uploadFile } from "../../hooks/fileupload";
import { Grid } from "@/components/ui/grid";
import { toast } from "sonner";

interface Props {
  courses: Course[];
}

const AssignmentForm = ({ courses }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<AssignmentCreateFormValues>();
  const { handleApiErrors } = useHandleApiErrors<AssignmentCreateFormValues>();
  const { create, loading } = useHandleAssignment();
  const [isUploading, setIsUploading] = useState(false);

  const startDate = useWatch({
    control,
    name: "startDate",
  });
  // const dueDate = useWatch({
  //   control,
  //   name: "dueDate",
  // });
  const file = useWatch({
    control,
    name: "document",
  });

  const selectedCourseId = useWatch({
    control,
    name: "courseId",
  });

  // Get modules for the selected course
  const modules = useMemo(() => {
    if (!selectedCourseId) return [];
    return courses.find((c) => c.id === selectedCourseId)?.course_modules ?? [];
  }, [selectedCourseId, courses]);

  // Get first file from FileList
  const uploadedFile = (file as FileList)?.[0];

  const onSubmit = async (data: AssignmentCreateFormValues) => {
    let resources = null;
    if (uploadedFile) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadFile(uploadedFile);
        if (uploadedUrl) {
          // Set the filename or URL as resources
          resources = uploadedUrl;
        } else {
          setError("document", {
            type: "manual",
            message: "File upload failed. Please try again.",
          });
          setIsUploading(false);
          return;
        }
      } catch {
        setError("document", {
          type: "manual",
          message: "File upload error. Please try again.",
        });
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }
    const payload = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      ...(resources && { resources }),
    };

    const response = await create(payload);
    if (response && !response.success) {
      return handleApiErrors(response, setError);
    } else {
      toast.success("Assignment created successfully");
      reset();
    }
  };
  return (
    <>
      {errors.root?.message && (
        <p className="my-2 rounded-md bg-red-50 p-4 text-center text-red-500">
          {errors?.root?.message}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />

        <Grid cols={2} gap={4}>
          {/* Course */}
          <div>
            <label className="label-base">Course</label>
            <select
              className="input-base"
              {...register("courseId", {
                required: "Course is required",
                valueAsNumber: true,
              })}
            >
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <Text className="text-sm text-red-500">{errors.courseId.message}</Text>
            )}
          </div>

          {/* Module */}
          <div>
            <label className="label-base">Module</label>
            <select
              className="input-base"
              disabled={!selectedCourseId}
              {...register("moduleId", {
                required: "Module is required",
                valueAsNumber: true,
              })}
            >
              <option value="">{selectedCourseId ? "Select module" : "Select course first"}</option>
              {modules?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
            {errors.moduleId && (
              <Text className="text-sm text-red-500">{errors.moduleId.message}</Text>
            )}
          </div>
        </Grid>

        <Textarea label="Instruction / Description" {...register("description")} />

        <Grid cols={2} gap={4}>
          <Input
            type="date"
            label="Start Date"
            required
            {...register("startDate", {
              required: "Start Date is required",
            })}
            error={errors.startDate?.message}
          />

          <Input
            type="date"
            label="Due Date"
            required
            {...register("dueDate", {
              required: "Due Date is required",
              validate: (value) => {
                if (value && startDate && new Date(value) < new Date(startDate)) {
                  return "Due Date cannot be earlier than Start Date";
                }
                return true;
              },
            })}
            error={errors.dueDate?.message}
          />
        </Grid>

        <Input
          type="number"
          label="Total Mark"
          {...register("totalMarks", { required: "Total Mark is required", valueAsNumber: true })}
          required
          error={errors.totalMarks?.message}
        />

        <Textarea label="Notes" {...register("notes")} />

        <Input
          type="file"
          label="Upload Document (Image or PDF)"
          accept="image/*,application/pdf"
          {...register("document", {
            validate: (fileList) => {
              const file = fileList?.[0];
              if (!file) return true; // Not required, so return true if no file
              if (
                !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)
              ) {
                return "Only image or PDF files are allowed";
              }
              if (file.size > 5 * 1024 * 1024) return "Max file size is 5MB";
              return true;
            },
          })}
          error={errors?.document?.message}
        />

        {uploadedFile && uploadedFile.type.startsWith("image/") ? (
          <Image
            width={200}
            height={200}
            src={URL.createObjectURL(uploadedFile)}
            alt="Preview"
            className="mt-2 h-32 w-32 rounded object-cover"
          />
        ) : uploadedFile ? (
          <p className="mt-2 text-sm">📄 {uploadedFile.name}</p>
        ) : null}

        <label className="mb-2 block font-medium text-gray-700">Status</label>
        <select
          {...register("status", { valueAsNumber: true })}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="">Select Status</option>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        {/* {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>} */}

        <Button variant="default" disabled={loading || isUploading} size="sm">
          {loading ? "Submitting..." : isUploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </>
  );
};
export default AssignmentForm;
