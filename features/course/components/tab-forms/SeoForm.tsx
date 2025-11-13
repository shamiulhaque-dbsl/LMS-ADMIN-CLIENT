import { Input } from "@/components/ui/input";

export const SeoForm = () => {
  return (
    <div className="space-y-4">
      <Input
        label="Meta keywords"
        type="text"
        step="0.01"
        placeholder="Write a list of comma separated meta keywords"
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="meta_description">
          Meta Description
        </label>
        <textarea
          name="meta_description"
          placeholder="Enter meta description"
          className="block w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          required
        ></textarea>
      </div>
    </div>
  );
};

SeoForm.displayName = "SeoForm";
