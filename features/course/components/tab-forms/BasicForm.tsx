import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils/tailwind-utils";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const BasicForm = () => {
  const categories = useCourseFormStore((s) => s.categories);
  const courseMetadata = useCourseFormStore((s) => s.courseMetadata);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-gray-600">Let's start with the fundamental details of your course.</p>
        </div>

        <div className="space-y-2">
          <Input
            id="title"
            label="Course Title"
            placeholder="e.g., Complete Web Development Bootcamp"
            required
            {...register("title")}
            maxLength={100}
            error={errors.title?.message?.toString()}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            id="shortDescription"
            label="Short Description"
            placeholder="A brief, compelling summary of your course (1-2 sentences)"
            {...register("shortDescription")}
            rows={3}
            maxLength={200}
            error={errors.shortDescription?.message?.toString()}
          />
        </div>

        <div className="space-y-2">
          <Textarea
            id="description"
            label="Description"
            placeholder="A detailed overview of what students will learn and achieve in this course"
            {...register("description")}
            rows={5}
            maxLength={200}
            error={errors.description?.message?.toString()}
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="label-base" htmlFor="courseType">
              Course Type <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              id="courseType"
              {...register("courseType")}
              className={cn("input-base", errors.courseType && "input-error")}
            >
              <option value="">Select a course type</option>
              {courseMetadata?.courseTypes.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.courseType && (
              <p className="error-text">{errors.courseType?.message?.toString()}</p>
            )}
          </div>

          <div className="w-full">
            <label className="label-base" htmlFor="category">
              Category <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register("category", { valueAsNumber: true })}
              className={cn("input-base", errors.category && "input-error")}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error-text">{errors.category?.message?.toString()}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="label-base" htmlFor="level">
              Skill Level
            </label>
            <select id="level" {...register("level")} className="input-base">
              <option value="">Select a skill level</option>
              {courseMetadata?.coursesSkillLevels.map((skillLevel) => (
                <option value={skillLevel.value} key={skillLevel.value}>
                  {skillLevel.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="label-base" htmlFor="status">
              Course Status <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              id="status"
              {...register("status", { required: "Course status is required" })}
              className={cn("input-base", errors.status && "input-error")}
            >
              <option value="">Select a status</option>
              {courseMetadata?.courseStatus.map((status) => (
                <option value={status.value} key={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {errors.status && <p className="error-text">{errors.status?.message?.toString()}</p>}
          </div>
        </div>

        <div className="space-y-4 rounded-md border border-gray-200 p-4">
          <div className="flex items-center">
            <input type="checkbox" id="courseForum" {...register("courseForum")} className="mr-2" />
            <label htmlFor="courseForum" className="text-sm text-gray-700">
              Course Forum
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="downloadableContent"
              {...register("downloadableContent")}
              className="mr-2"
            />
            <label htmlFor="downloadableContent" className="text-sm text-gray-700">
              Downloadable Content
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificateAvailable"
              {...register("certificateAvailable")}
              className="mr-2"
            />
            <label htmlFor="certificateAvailable" className="text-sm text-gray-700">
              Certificate Available
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
