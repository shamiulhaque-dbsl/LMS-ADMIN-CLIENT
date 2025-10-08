import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";

/*
  # Note:
  - This category form component use for both create and update category
*/

export const CategoryForm = () => {
  return (
    <form className="space-y-4">
      <Input id="name" name="name" label="Category Name" required />
      <Textarea id="description" name="description" label="Category Description" />
      <Button variant="default" size="sm">
        Create
      </Button>
    </form>
  );
};

CategoryForm.displayName = "CategoryForm";
