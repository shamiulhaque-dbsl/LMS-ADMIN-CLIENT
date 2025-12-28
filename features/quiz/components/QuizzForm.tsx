"use client";

import { useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import type { QuizCreateFormValues } from "../types";
import type { Course } from "@/features/course/types";
import { useCreateQuiz } from "../hooks/useCreateQuiz";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";

interface Props {
  courses: Course[];
}

export const QuizzForm = ({ courses }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<QuizCreateFormValues>({
    defaultValues: {
      status: "draft",
      randomizeQuestions: false,
      randomizeOptions: false,
    },
  });
  const { handleApiErrors } = useHandleApiErrors<QuizCreateFormValues>();

  const { create, loading } = useCreateQuiz();

  const selectedCourseId = useWatch({
    control,
    name: "courseId",
  });

  const modules = useMemo(() => {
    if (!selectedCourseId) return [];
    return courses.find((c) => c.id === selectedCourseId)?.courseModules ?? [];
  }, [selectedCourseId, courses]);

  // reset module when course changes
  useEffect(() => {
    setValue("moduleId", undefined as any);
  }, [selectedCourseId, setValue]);

  const onSubmit = async (data: QuizCreateFormValues) => {
    const response = await create(data);
    if (response && !response.success) {
      return handleApiErrors(response, setError);
    }

    reset();
  };

  return (
    <>
      {errors.root && <Text className="text-red-500 text-sm">{errors.root.message}</Text>}

      {isSubmitSuccessful && !errors.root && (
        <Text className="text-green-600 text-center">Quiz created successfully.</Text>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />

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
            <Text className="text-red-500 text-sm">{errors.courseId.message}</Text>
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
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
          {errors.moduleId && (
            <Text className="text-red-500 text-sm">{errors.moduleId.message}</Text>
          )}
        </div>

        <Input
          type="number"
          label="Duration (Minutes)"
          required
          {...register("timeLimitMinutes", {
            required: "Duration is required",
            valueAsNumber: true,
          })}
          error={errors.timeLimitMinutes?.message}
        />

        <Grid cols={3}>
          <Input
            type="number"
            label="Total Mark"
            {...register("totalPoint", { required: "Total Mark is required", valueAsNumber: true })}
            required
            error={errors.totalPoint?.message}
          />
          <Input
            type="number"
            label="Pass Mark"
            {...register("passingPoint", {
              required: "Pass Mark is required",
              valueAsNumber: true,
            })}
            required
            error={errors.passingPoint?.message}
          />
          <Input
            type="number"
            label="Number of Attempts"
            {...register("maxAttempts", {
              required: "Number of Attempts is required",
              valueAsNumber: true,
            })}
            required
            error={errors.maxAttempts?.message}
          />
        </Grid>

        <Textarea label="Instruction / Description" {...register("description")} />

        <div>
          <label className="label-base">Status</label>
          <select className="input-base" {...register("status")}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="space-x-2">
            <input type="checkbox" {...register("randomizeQuestions")} />
            <Text as="span" className="text-sm">
              Display Questions Randomly
            </Text>
          </label>

          <label className="space-x-2">
            <input type="checkbox" {...register("randomizeOptions")} />
            <Text as="span" className="text-sm">
              Display Options Randomly
            </Text>
          </label>
        </div>

        <Button variant="default" disabled={loading} size="sm">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

QuizzForm.displayName = "QuizzForm";
