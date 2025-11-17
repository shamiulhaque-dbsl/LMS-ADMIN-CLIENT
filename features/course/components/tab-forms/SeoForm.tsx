import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useFormContext } from "react-hook-form";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { cn } from "@/lib/utils/tailwind-utils";

export const SeoForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const updateField = useCourseFormStore((state) => state.updateField);
  const metaDescription = watch("metaDescription");

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
        {...register("metaTitle", {
          required: "Meta title is required",
          minLength: { value: 10, message: "Meta title must be at least 10 characters" },
          maxLength: { value: 60, message: "Meta title should not exceed 60 characters" },
        })}
        onChange={(e) => updateField("metaTitle", e.target.value)}
        error={errors.metaTitle?.message?.toString()}
      />

      <Textarea
        id="metaDescription"
        label="Meta Description"
        placeholder="Write a compelling description (50-160 characters recommended)"
        {...register("metaDescription", {
          required: "Meta description is required",
          minLength: { value: 50, message: "Meta description must be at least 50 characters" },
          maxLength: { value: 160, message: "Meta description should not exceed 160 characters" },
        })}
        onChange={(e) => updateField("metaDescription", e.target.value)}
        rows={4}
        error={errors.metaDescription?.message?.toString()}
      />
      <p className="text-xs text-gray-500">{metaDescription?.length || 0}/160 characters</p>

      <Input
        id="metaKeywords"
        label="Meta Keywords"
        placeholder="keyword1, keyword2, keyword3, keyword4, keyword5"
        {...register("metaKeywords", {
          required: "Meta keywords are required",
        })}
        onChange={(e) => {
          const keywords = e.target.value
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k);
          updateField("metaKeywords", keywords);
        }}
        error={errors.metaKeywords?.message?.toString()}
      />
      <p className="text-xs text-gray-600">Separate keywords with commas (minimum 3 keywords)</p>
    </div>
  );
};

SeoForm.displayName = "SeoForm";
