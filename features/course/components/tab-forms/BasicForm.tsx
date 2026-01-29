import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils/tailwind-utils";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import Image from "next/image";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const BasicForm = () => {
  const { user } = useAuthStore();
  const categories = useCourseFormStore((s) => s.categories);
  const courseMetadata = useCourseFormStore((s) => s.courseMetadata);
  const teachers = useCourseFormStore((s) => s.teachers);
  const courseInstructors = useCourseFormStore((s) => s.courseInstructors);
  const mode = useCourseFormStore((s) => s.mode);
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
        {(mode === "edit" && user?.role === "admin") && (
          <>
            <div className="space-y-2">
              <label className="label-base" htmlFor="instructor">
                Instructor of this course
              </label>

              {courseInstructors && courseInstructors.length === 0 ? (
                <p className="text-gray-600">No instructors assigned to this course.</p>
              ) : (
                <div className="space-y-1">
                  {courseInstructors?.map((instructor: any) => (
                    <div key={instructor.id} className="flex items-center rounded-lg bg-white py-1">
                      {/* Left: Image + Name */}
                      <div className="flex items-center gap-3">
                        <Image
                          width={80}
                          height={80}
                          src={instructor?.users?.avatar_url || "/images/user.jpg"}
                          alt={instructor?.users?.first_name}
                          className="h-10 w-10 rounded-full object-cover border"
                        />

                        <span className="text-sm font-medium text-gray-800">
                          {instructor?.users?.first_name}
                        </span>
                      </div>

                      {/* Right: Remove Button */}
                      {/* <button
                    type="button"
                    // onClick={() => handleRemoveInstructor(instructor.id)}
                    className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    Remove
                  </button> */}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full">
              <label className="label-base" htmlFor="instructor">
                Add new instructor <span className="ml-1 text-red-500">*</span>
              </label>
              <select
                id="instructor"
                {...register("instructor")}
                className={cn("input-base", errors.instructor && "input-error")}
              >
                <option value="">select</option>
                {teachers?.map((teacher: any) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.first_name}
                  </option>
                ))}
              </select>
              {errors.instructor && (
                <p className="error-text">{errors.instructor?.message?.toString()}</p>
              )}
            </div>
          </>
        )}

        <div className="space-y-2">
          <Textarea
            id="description"
            label="Description"
            placeholder="A brief, compelling summary of your course (1-2 sentences)"
            {...register("description")}
            rows={3}
            maxLength={200}
            error={errors.description?.message?.toString()}
          />
        </div>

        <div className="space-y-2">
          <Textarea
            id="longDescription"
            label="Long Description"
            placeholder="A detailed overview of what students will learn and achieve in this course"
            {...register("longDescription")}
            rows={5}
            maxLength={200}
            error={errors.longDescription?.message?.toString()}
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
