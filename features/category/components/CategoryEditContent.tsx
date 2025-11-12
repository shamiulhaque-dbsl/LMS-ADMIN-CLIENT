import { use } from "react";
import { Category } from "@/features/category/types";
import { CategoryForm } from "@/features/category/components/CategoryForm";

type CategoryEditContentProps = {
  fetchCategory: () => Promise<Category>;
};

export function CategoryEditContent({ fetchCategory }: CategoryEditContentProps) {
  const category = use(fetchCategory());
  return <CategoryForm category={category} />;
}
