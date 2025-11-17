import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/uploads/image";
import { useFormContext } from "react-hook-form";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { cn } from "@/lib/utils/tailwind-utils";

export const MediaForm = ({
  videoSources,
}: {
  videoSources: { label: string; value: string }[] | undefined;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const updateField = useCourseFormStore((state) => state.updateField);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Media & Preview</h2>
        <p className="text-gray-600">Upload course preview video and thumbnail image.</p>
      </div>

      <div className="w-full">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="videoSource">
          Course Demo/Overview Source <span className="ml-1 text-red-500">*</span>
        </label>
        <select
          id="videoSource"
          {...register("previewVideo", { required: "Video source is required" })}
          onChange={(e) => updateField("previewVideo", e.target.value)}
          className={cn(
            "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
            errors.previewVideo && "border-red-500"
          )}
        >
          <option value="">Select a source</option>
          {videoSources?.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>
        {errors.previewVideo && (
          <p className="mt-1 text-xs text-red-500">{errors.previewVideo?.message?.toString()}</p>
        )}
      </div>

      <Input
        id="previewUrl"
        label="Course Demo/Overview URL"
        type="url"
        placeholder="https://www.youtube.com/watch?v=example"
        {...register("previewUrl", {
          required: "Preview URL is required",
          pattern: {
            value: /^(https?:\/\/)?(www\.)?(youtube\.com|vimeo\.com|youtu\.be)\/.+/,
            message: "Please enter a valid video URL (YouTube, Vimeo, etc.)",
          },
        })}
        onChange={(e) => updateField("previewUrl", e.target.value)}
        error={errors.previewUrl?.message?.toString()}
      />

      <div className="space-y-4">
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Course Thumbnail <span className="ml-1 text-red-500">*</span>
        </label>
        <ImageUpload
          size="lg"
          variant="circle"
          showEditButton={false}
          showUploadGuideline={false}
        />
        {errors.thumbnail && (
          <p className="text-xs text-red-500">{errors.thumbnail?.message?.toString()}</p>
        )}
        <p className="text-xs text-gray-600">Recommended size: 800x600px</p>
      </div>

      <div className="space-y-4">
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Course Gallery Images (Optional)
        </label>
        <ImageUpload
          size="md"
          variant="default"
          showEditButton={false}
          showUploadGuideline={true}
        />
        <p className="text-xs text-gray-600">You can add multiple images to showcase your course</p>
      </div>
    </div>
  );
};

MediaForm.displayName = "MediaForm";
