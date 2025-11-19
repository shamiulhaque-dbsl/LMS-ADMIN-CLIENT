import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useFormContext } from "react-hook-form";

export const SeoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">SEO Optimization</h2>
        <p className="text-gray-600">Improve your course visibility in search engines.</p>
      </div>

      <Input
        id="metaTitle"
        label="Meta Title"
        placeholder="Your awesome course - Learn from experts"
        {...register("metaTitle")}
        error={errors.metaTitle?.message?.toString()}
      />

      <Textarea
        id="metaDescription"
        label="Meta Description"
        placeholder="Write a compelling description (50-160 characters recommended)"
        {...register("metaDescription")}
        rows={4}
        error={errors.metaDescription?.message?.toString()}
      />

      <div>
        <Input
          id="metaKeywords"
          label="Meta Keywords"
          placeholder="keyword1, keyword2, keyword3, keyword4, keyword5"
          {...register("metaKeywords")}
          error={errors.metaKeywords?.message?.toString()}
        />
        <p className="text-xs text-gray-600">Separate keywords with commas (minimum 3 keywords)</p>
      </div>
    </div>
  );
};

SeoForm.displayName = "SeoForm";
