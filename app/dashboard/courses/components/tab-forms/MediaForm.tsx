import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/uploads/image";

export const MediaForm = () => {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="short_description">
          Course Demo/Overview Source
        </label>
        <select className="block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
          <option value="upload">Upload</option>
          <option value="youtube">Youtube</option>
          <option value="external">External</option>
          <option value="vimeo">Vimeo</option>
          <option value="google_drive">Google Drive</option>
          <option value="iframe">Iframe</option>
        </select>
      </div>
      <div className="w-full">
        <Input
          label="Course Demo/Overview URL"
          name="title"
          placeholder="E.H: hhtps://www.youtube.com/watch?v=example"
        />
      </div>
      <div className="space-y-4">
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Course thumbnail
        </label>
        <ImageUpload
          size="lg"
          variant="circle"
          showEditButton={false}
          showUploadGuideline={false}
        />
      </div>
    </div>
  );
};

MediaForm.displayName = "MediaForm";
