import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/uploads/image";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils/tailwind-utils";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const MediaForm = () => {
  const videoSources = useCourseFormStore((s) => s.courseMetadata?.videoDemoSources);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Media & Preview</h2>
        <p className="text-gray-600">Upload the preview video and course thumbnail.</p>
      </div>

      {/* Video Source */}
      <div>
        <label className="label-base" htmlFor="previewVideo">
          Course Demo/Overview Source
        </label>

        <select
          id="videoDemoSource"
          {...register("videoDemoSource")}
          className={cn("input-base", errors.videoDemoSource && "border-red-500")}
        >
          <option value="">Select a source</option>
          {videoSources?.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>

        {errors.videoDemoSource && (
          <p className="error-text">{errors.videoDemoSource.message?.toString()}</p>
        )}
      </div>

      {/* Preview URL */}
      <Input
        id="videoDemoUrl"
        label="Course Demo/Overview URL"
        type="url"
        placeholder="https://www.youtube.com/watch?v=example"
        {...register("videoDemoUrl")}
        error={errors.videoDemoUrl?.message?.toString()}
      />

      {/* Thumbnail Upload */}
      <div className="space-y-4">
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Course Thumbnail
        </label>

        <ImageUpload size="lg" variant="circle" showEditButton={false} showUploadGuideline={true} />

        {errors.thumbnail && (
          <p className="text-xs text-red-500">{errors.thumbnail.message?.toString()}</p>
        )}

        <p className="text-xs text-gray-600">Recommended size: 800x600px</p>
      </div>
    </div>
  );
};

MediaForm.displayName = "MediaForm";

// import { Input } from "@/components/ui/input";
// import { ImageUpload } from "@/components/ui/uploads/image";
// import { useFormContext } from "react-hook-form";
// import { cn } from "@/lib/utils/tailwind-utils";

// export const MediaForm = ({
//   videoSources,
// }: {
//   videoSources: { label: string; value: string }[] | undefined;
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-bold text-gray-900">Media & Preview</h2>
//         <p className="text-gray-600">Upload course preview video and thumbnail image.</p>
//       </div>

//       <div className="w-full">
//         <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="videoSource">
//           Course Demo/Overview Source
//         </label>
//         <select
//           id="videoSource"
//           {...register("previewVideo")}
//           className={cn(
//             "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
//             errors.previewVideo && "border-red-500"
//           )}
//         >
//           <option value="">Select a source</option>
//           {videoSources?.map((source) => (
//             <option key={source.value} value={source.value}>
//               {source.label}
//             </option>
//           ))}
//         </select>
//         {errors.previewVideo && (
//           <p className="mt-1 text-xs text-red-500">{errors.previewVideo?.message?.toString()}</p>
//         )}
//       </div>

//       <Input
//         id="previewUrl"
//         label="Course Demo/Overview URL"
//         type="url"
//         placeholder="https://www.youtube.com/watch?v=example"
//         {...register("previewUrl")}
//         error={errors.previewUrl?.message?.toString()}
//       />

//       <div className="space-y-4">
//         <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
//           Course Thumbnail
//         </label>
//         <ImageUpload size="lg" variant="circle" showEditButton={false} showUploadGuideline={true} />
//         {errors.thumbnail && (
//           <p className="text-xs text-red-500">{errors.thumbnail?.message?.toString()}</p>
//         )}
//         <p className="text-xs text-gray-600">Recommended size: 800x600px</p>
//       </div>
//     </div>
//   );
// };

// MediaForm.displayName = "MediaForm";
