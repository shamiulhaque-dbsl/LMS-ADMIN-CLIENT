import { Input } from "@/components/ui/input";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

export const PricingForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const isFree = useWatch({ name: "isFree" });
  const expiry = useWatch({ name: "expiryPeriod" });
  const month = useWatch({ name: "month" });

  // If user selects "lifetime", clear months — do this inside an effect
  // to avoid calling setValue during render which can cause render loops.
  useEffect(() => {
    if (expiry === "lifetime" && month) {
      setValue("month", "", { shouldValidate: true, shouldDirty: true });
    }
  }, [expiry, month, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Pricing & Currency</h2>
        <p className="text-gray-600">Set your course price and discount options.</p>
      </div>

      {/* FREE COURSE CHECKBOX */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFree"
          {...register("isFree")}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
          Check if this is a free course
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Course Price"
          type="number"
          step="0.01"
          placeholder="Enter course price"
          disabled={isFree}
          {...register("price")}
          error={errors.price?.message?.toString()}
        />

        <Input
          label="Discounted Price (if applicable)"
          type="number"
          step="0.01"
          placeholder="Enter discounted price"
          disabled={isFree}
          {...register("discountedPrice")}
        />

        <div className="col-span-3 space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Expiry Period</label>

          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_lifetime"
                value="lifetime"
                className="mr-2"
                {...register("expiryPeriod")}
              />
              <label htmlFor="expiry_lifetime" className="text-sm text-gray-700">
                Lifetime
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_limited"
                value="limited"
                className="mr-2"
                {...register("expiryPeriod")}
              />
              <label htmlFor="expiry_limited" className="text-sm text-gray-700">
                Limited Time
              </label>
            </div>
          </div>

          {errors.expiryPeriod && (
            <p className="text-xs text-red-500">{errors.expiryPeriod.message?.toString()}</p>
          )}
        </div>

        <Input
          label="Course Duration"
          placeholder="E.g., 10 hours"
          {...register("durationHours")}
        />

        {expiry === "limited" && (
          <Input
            label="Number of Months"
            type="number"
            placeholder="E.g., 20"
            required
            {...register("numberOfMonths", {
              required: "Month is required for limited time expiry",
              validate: (v) => {
                if (expiry === "limited" && !v) {
                  return "Month is required for limited time expiry";
                }
                return true;
              },
            })}
            error={errors.month?.message?.toString()}
          />
        )}
      </div>
    </div>
  );
};

PricingForm.displayName = "PricingForm";
