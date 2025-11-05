"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useCategoryAction } from "../hooks/useCategoryAction";
import { Category } from "../types";

type FormData = {
  name: string;
  description: string;
};

type CategoryFormProps = {
  category?: Category;
};

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const { create, loading } = useCategoryAction();
  const { handleApiErrors } = useHandleApiErrors<FormData>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: category ? { name: category.name, description: category.description } : {},
  });

  const onSubmit = async (data: FormData) => {
    const res = await create(data);
    if (res && !res.success) {
      handleApiErrors(res.response, setError);
    }

    reset();
  };

  return (
    <>
      {errors.root?.message && <p className="text-red-500 text-center">{errors.root.message}</p>}
      {isSubmitSuccessful && (
        <p className="text-green-600 text-center">Category created successfully.</p>
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
        <Button type="submit" variant="default" size="sm" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>
    </>
  );
};

CategoryForm.displayName = "CategoryForm";
