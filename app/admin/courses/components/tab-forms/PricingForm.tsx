import { Input } from "@/components/ui/input";

export const PricingForm = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFree"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
          Check if this is a free course
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Course Price" type="number" step="0.01" placeholder="Enter course price" />
        <Input
          label="Discounted price (if applicable)"
          type="number"
          placeholder="Enter discounted price"
        />
        {/* Implement radio box of Expiry period: Lifetime or limited time */}
        <div className="col-span-3 md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Expiry Period</label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_lifetime"
                name="expiry"
                value="lifetime"
                className="mr-2"
              />
              <label htmlFor="expiry_lifetime" className="text-sm text-gray-700">
                Lifetime
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_limited"
                name="expiry"
                value="limited"
                className="mr-2"
              />
              <label htmlFor="expiry_limited" className="text-sm text-gray-700">
                Limited Time
              </label>
            </div>
          </div>
        </div>
        <Input label="Course Duration" placeholder="E.g., 10 hours" />
        <Input label="Number of Lectures" type="number" placeholder="E.g., 20" />
      </div>
    </div>
  );
};

PricingForm.displayName = "PricingForm";
