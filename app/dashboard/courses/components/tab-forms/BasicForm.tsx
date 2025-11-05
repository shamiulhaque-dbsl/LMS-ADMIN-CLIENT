import { Input } from "@/components/ui/input";
import { useCourseFormStore } from "@/dashboard/courses/store/useCourseFormStore";
import { cn } from "@/lib/utils/tailwind-utils";
import { Textarea } from "@/components/ui/Textarea";

export const BasicForm = () => {
  const formData = useCourseFormStore((state) => state.formData);
  const updateField = useCourseFormStore((state) => state.updateField);
  const validationErrors = useCourseFormStore((state) => state.validationErrors);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    updateField("title", value);
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      updateField("slug", generateSlug(value));
    }
  };

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
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          maxLength={100}
          error={validationErrors.title}
        />
        <p className="text-xs text-gray-500">{formData.title.length}/100 characters</p>
      </div>
      <div className="space-y-2">
        <Textarea
          id="shortDescription"
          label="Short Description"
          placeholder="A brief, compelling summary of your course (1-2 sentences)"
          value={formData.shortDescription}
          onChange={(e) => updateField("shortDescription", e.target.value)}
          className={cn(validationErrors.shortDescription && "border-red-500")}
          rows={3}
          maxLength={200}
          error={validationErrors.shortDescription}
        />
        <p className="text-xs text-gray-500">{formData.shortDescription.length}/200 characters</p>
      </div>

      <div className="space-y-2">
        <Textarea
          id="description"
          label="Long Description"
          placeholder="Provide a detailed description of what students will learn, course structure, prerequisites, etc."
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          className={cn(validationErrors.description && "border-red-500")}
          rows={8}
          maxLength={5000}
          error={validationErrors.description}
        />
        <p className="text-xs text-gray-500">{formData.description.length}/5000 characters</p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="short_description"
          >
            Course Type <span className="ml-1 text-red-500">*</span>
          </label>
          <select className="required block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
            <option value="live">Live</option>
            <option value="recorded">Recorded</option>
            <option value="blended">Blended</option>
          </select>
        </div>
        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="short_description"
          >
            Category <span className="ml-1 text-red-500">*</span>
          </label>
          <select className="block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="short_description"
          >
            Skill Level
          </label>
          <select className="block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="status">
            Course Status <span className="ml-1 text-red-500">*</span>
          </label>
          <select className="block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
            <option value="active">Active</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Make ui with toggle system with this lavel: Course Forum, Downloadable Content, Certificate Available  */}
      <div className="space-y-4 rounded-md border border-gray-200 p-4">
        <div className="flex items-center">
          <input type="checkbox" id="course_forum" className="mr-2" />
          <label htmlFor="course_forum" className="text-sm text-gray-700">
            Course Forum
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="downloadable_content" className="mr-2" />
          <label htmlFor="downloadable_content" className="text-sm text-gray-700">
            Downloadable Content
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="certificate_available" className="mr-2" />
          <label htmlFor="certificate_available" className="text-sm text-gray-700">
            Certificate Available
          </label>
        </div>
      </div>
    </div>
  );
};

BasicForm.displayName = "BasicForm";
