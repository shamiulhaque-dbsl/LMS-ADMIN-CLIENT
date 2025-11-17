import { Input } from "@/components/ui/input";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { cn } from "@/lib/utils/tailwind-utils";
import { Textarea } from "@/components/ui/Textarea";
import type { Category } from "@/features/category/types";
import type { CourseMetadataFormatted } from "@/features/course/types";
import { useFormContext } from "react-hook-form";

export const BasicForm = ({
  categories,
  courseMetadata,
}: {
  categories: Category[];
  courseMetadata: CourseMetadataFormatted | null;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const updateField = useCourseFormStore((state) => state.updateField);
  const formData = useCourseFormStore((state) => state.formData);
  const title = watch("title");

  const generateSlug = (titleValue: string) => {
    return titleValue
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    updateField("title", value);
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      const newSlug = generateSlug(value);
      updateField("slug", newSlug);
      setValue("slug", newSlug);
    }
  };

  if (!courseMetadata || courseMetadata === undefined) return null;

  return (
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
          {...register("title", {
            required: "Title is required",
            minLength: { value: 5, message: "Title must be at least 5 characters" },
          })}
          onChange={(e) => handleTitleChange(e.target.value)}
          maxLength={100}
          error={errors.title?.message?.toString()}
        />
        <p className="text-xs text-gray-500">{title?.length || 0}/100 characters</p>
      </div>

      <div className="space-y-2">
        <Textarea
          id="shortDescription"
          label="Short Description"
          placeholder="A brief, compelling summary of your course (1-2 sentences)"
          required
          {...register("shortDescription", {
            required: "Short description is required",
            minLength: { value: 10, message: "Short description must be at least 10 characters" },
          })}
          onChange={(e) => updateField("shortDescription", e.target.value)}
          rows={3}
          maxLength={200}
          error={errors.shortDescription?.message?.toString()}
        />
        <p className="text-xs text-gray-500">{formData.shortDescription.length}/200 characters</p>
      </div>

      <div className="space-y-2">
        <Textarea
          id="description"
          label="Long Description"
          placeholder="Provide a detailed description of what students will learn, course structure, prerequisites, etc."
          required
          {...register("description", {
            required: "Description is required",
            minLength: { value: 20, message: "Long description must be at least 20 characters" },
          })}
          onChange={(e) => updateField("description", e.target.value)}
          rows={8}
          maxLength={5000}
          error={errors.description?.message?.toString()}
        />
        <p className="text-xs text-gray-500">{formData.description.length}/5000 characters</p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="courseType">
            Course Type <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="courseType"
            {...register("courseType", { required: "Course type is required" })}
            onChange={(e) => updateField("courseType", e.target.value)}
            className={cn(
              "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
              errors.courseType && "border-red-500"
            )}
          >
            <option value="">Select a course type</option>
            {courseMetadata?.courseTypes.map((type) => (
              <option value={type.value} key={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.courseType && (
            <p className="mt-1 text-xs text-red-500">{errors.courseType?.message?.toString()}</p>
          )}
        </div>

        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="category">
            Category <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            onChange={(e) => updateField("category", e.target.value)}
            className={cn(
              "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
              errors.category && "border-red-500"
            )}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">{errors.category?.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="level">
            Skill Level <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="level"
            {...register("level", { required: "Skill level is required" })}
            onChange={(e) => updateField("level", e.target.value as any)}
            className={cn(
              "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
              errors.level && "border-red-500"
            )}
          >
            <option value="">Select a skill level</option>
            {courseMetadata?.coursesSkillLevels.map((skillLevel) => (
              <option value={skillLevel.value} key={skillLevel.value}>
                {skillLevel.label}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="mt-1 text-xs text-red-500">{errors.level?.message?.toString()}</p>
          )}
        </div>

        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="status">
            Course Status <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register("status", { required: "Course status is required" })}
            onChange={(e) => updateField("status", e.target.value)}
            className={cn(
              "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
              errors.status && "border-red-500"
            )}
          >
            <option value="">Select a status</option>
            {courseMetadata?.courseStatus.map((status) => (
              <option value={status.value} key={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-xs text-red-500">{errors.status?.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-md border border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="courseForum"
            {...register("courseForum")}
            onChange={(e) => updateField("courseForum", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="courseForum" className="text-sm text-gray-700">
            Course Forum
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="downloadableContent"
            {...register("downloadableContent")}
            onChange={(e) => updateField("downloadableContent", e.target.checked)}
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
            onChange={(e) => updateField("certificateAvailable", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="certificateAvailable" className="text-sm text-gray-700">
            Certificate Available
          </label>
        </div>
      </div>
    </div>
  );
};

BasicForm.displayName = "BasicForm";
