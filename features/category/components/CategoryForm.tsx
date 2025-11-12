"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useCategoryAction } from "@/features/category/hooks/useCategoryAction";
import { Category, FormData } from "@/features/category/types";

type CategoryFormProps = {
  category?: Category;
};

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const { create, update, loading } = useCategoryAction();
  const { handleApiErrors } = useHandleApiErrors<FormData>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: category
      ? {
          name: category.name,
          description: category.description,
          status: category.status,
          sort_order: category.sort_order,
        }
      : {},
  });

  const onSubmit = async (data: FormData) => {
    const response = category ? await update(category.id, data) : await create(data);
    if (response && !response.success) {
      return handleApiErrors(response, setError);
    }

    if (!category) reset();
  };

  return (
    <>
      {errors.root?.message && <p className="text-red-500 text-center">{errors.root.message}</p>}

      {isSubmitSuccessful && !errors.root && (
        <p className="text-green-600 text-center">Category submitted successfully.</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="Category Name"
          required
          {...register("name", {
            required: "Category is required",
          })}
          error={errors.name?.message}
        />
        <Textarea id="description" label="Category Description" {...register("description")} />
        {category && (
          <>
            <div>
              <label className="label-base">Status</label>
              <select className="input-base" {...register("status", { valueAsNumber: true })}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              {errors.status?.message && <p className="error-text">{errors.status.message}</p>}
            </div>

            <Input
              id="sort_order"
              label="Sort Order"
              required
              {...register("sort_order", { valueAsNumber: true })}
              type="number"
              error={errors.sort_order?.message}
            />
          </>
        )}

        <Button type="submit" variant="default" size="sm" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

CategoryForm.displayName = "CategoryForm";
