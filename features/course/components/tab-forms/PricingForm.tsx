import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import { cn } from "@/lib/utils/tailwind-utils";

export const PricingForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const updateField = useCourseFormStore((state) => state.updateField);
  const price = watch("price");
  const discountPrice = watch("discountPrice");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Pricing & Currency</h2>
        <p className="text-gray-600">Set your course price and discount options.</p>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="currency">
            Currency <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="currency"
            {...register("currency", { required: "Currency is required" })}
            onChange={(e) => updateField("currency", e.target.value)}
            className={cn(
              "block h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
              errors.currency && "border-red-500"
            )}
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="BDT">BDT</option>
            <option value="INR">INR</option>
          </select>
          {errors.currency && (
            <p className="mt-1 text-xs text-red-500">{errors.currency?.message?.toString()}</p>
          )}
        </div>

        <div className="w-full">
          <Input
            id="price"
            label="Regular Price"
            type="number"
            placeholder="99.99"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              validate: (value) => parseFloat(value) > 0 || "Price must be greater than 0",
            })}
            onChange={(e) => updateField("price", e.target.value)}
            error={errors.price?.message?.toString()}
          />
        </div>
      </div>

      <div className="w-full">
        <Input
          id="discountPrice"
          label="Discount Price (Optional)"
          type="number"
          placeholder="79.99"
          step="0.01"
          {...register("discountPrice", {
            validate: (value) => {
              if (!value) return true;
              if (parseFloat(value) >= parseFloat(price)) {
                return "Discount price must be less than regular price";
              }
              return true;
            },
          })}
          onChange={(e) => updateField("discountPrice", e.target.value)}
          error={errors.discountPrice?.message?.toString()}
        />
      </div>

      {price && discountPrice && parseFloat(discountPrice) < parseFloat(price) && (
        <div className="rounded-md border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">
            <strong>Discount:</strong>{" "}
            {(((parseFloat(price) - parseFloat(discountPrice)) / parseFloat(price)) * 100).toFixed(
              0
            )}
            % off
          </p>
        </div>
      )}
    </div>
  );
};

PricingForm.displayName = "PricingForm";
