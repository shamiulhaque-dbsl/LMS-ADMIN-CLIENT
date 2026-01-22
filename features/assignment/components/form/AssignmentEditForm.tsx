"use client";
import { Input } from "@/components/ui/input";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { Assignment, AssignmentCreateFormValues } from "../../types/type-matric";
import { useHandleAssignment } from "../../hooks/useHandleAssignment";
import { useForm, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import Image from "next/image";
import { uploadFile } from "../../hooks/fileupload";
import { Grid } from "@/components/ui/grid";
import { toast } from "sonner";

interface Props {
  assignment: Assignment;
}

const AssignmentEditForm = ({ assignment }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<AssignmentCreateFormValues>({
    defaultValues: {
      title: assignment.title || "",
      description: assignment.description || "",
      startDate: assignment.startDate
        ? new Date(assignment.startDate).toISOString().split("T")[0]
        : "",
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().split("T")[0] : "",
      totalMarks: assignment.totalMarks || 0,
      notes: assignment.notes || "",
      status: assignment.status === 1 ? 1 : 0,
    },
  });

  const { handleApiErrors } = useHandleApiErrors<AssignmentCreateFormValues>();
  const { update, loading } = useHandleAssignment();
  const [isUploading, setIsUploading] = useState(false);
  const [existingResource, setExistingResource] = useState<string | null>(
    assignment.resources || null
  );

  // Reset form when assignment changes
  useEffect(() => {
    reset({
      title: assignment.title || "",
      description: assignment.description || "",
      startDate: assignment.startDate
        ? new Date(assignment.startDate).toISOString().split("T")[0]
        : "",
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().split("T")[0] : "",
      totalMarks: assignment.totalMarks || 0,
      notes: assignment.notes || "",
      status: assignment.status === 1 ? 1 : 0,
    });
    setExistingResource(assignment.resources || null);
  }, [assignment, reset]);

  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const file = useWatch({
    control,
    name: "document",
  });

  // Get first file from FileList
  const uploadedFile = (file as FileList)?.[0];

  const onSubmit = async (data: AssignmentCreateFormValues) => {
    let resources = existingResource; // Keep existing resource by default

    if (uploadedFile) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadFile(uploadedFile);
        if (uploadedUrl) {
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
      resources: resources || "",
    };

    const assignmentId = assignment.assignmentId || assignment.id;
    if (!assignmentId) {
      setError("root", {
        type: "manual",
        message: "Assignment ID not found",
      });
      return;
    }

    const response = await update(assignmentId, payload);
    if (response && !response.success) {
      document.getElementById("error")?.scrollIntoView({ behavior: "smooth" });
      return handleApiErrors(response, setError);
    } else {
      toast.success("Assignment updated successfully");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <>
      {errors.root?.message && (
        <p id="error" className="my-2 rounded-md bg-red-50 p-4 text-center text-red-500">
          {errors?.root?.message}
        </p>
      )}

      <div className="space-y-4" onSubmit={handleFormSubmit}>
        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />

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
          {...register("totalMarks", {
            required: "Total Mark is required",
            valueAsNumber: true,
          })}
          required
          error={errors.totalMarks?.message}
        />

        <Textarea label="Notes" {...register("notes")} />

        {/* Show existing resource */}
        {existingResource && !uploadedFile && (
          <div className="rounded-md border border-gray-200 p-4">
            <p className="mb-2 text-sm font-medium text-gray-700">Current Document:</p>
            {existingResource.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
              <Image
                width={200}
                height={200}
                src={existingResource}
                alt="Current document"
                className="h-32 w-32 rounded object-cover"
              />
            ) : (
              <p className="text-sm">📄 {existingResource}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">Upload a new file to replace this document</p>
          </div>
        )}

        <Input
          type="file"
          label="Upload Document (Image or PDF)"
          accept="image/*,application/pdf"
          {...register("document", {
            validate: (fileList) => {
              const file = fileList?.[0];
              if (!file) return true;
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

        <div>
          <label className="mb-2 block font-medium text-gray-700">Status</label>
          <select
            {...register("status", { valueAsNumber: true })}
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">Select Status</option>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <Button
          variant="default"
          disabled={loading || isUploading}
          size="sm"
          onClick={handleFormSubmit}
        >
          {loading ? "Updating..." : isUploading ? "Uploading..." : "Update Assignment"}
        </Button>
      </div>
    </>
  );
};

export default AssignmentEditForm;
