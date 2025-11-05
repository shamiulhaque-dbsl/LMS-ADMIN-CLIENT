import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
/*
  # Note:
  - This category form component use for both create and update category
*/

export const QuizzForm = () => {
  return (
    <form className="space-y-4">
      <Input id="title" name="title" label="Title" required />
      <div>
        <label className="label-base">Section</label>
        <select name="section" id="section" className="input-base">
          <option value="1">Section 1</option>
          <option value="2">Section 2</option>
          <option value="3">Section 3</option>
        </select>
      </div>
      <Grid cols={2}>
        <Input type="number" id="time" name="time" label="Time (Miniutes)" required />
        <Input type="number" id="passing_point" name="passing_point" label="Pass Mark" required />
      </Grid>
      <Input type="number" id="max_attempts" name="max_attempts" label="Number of Attempts" />
      <Textarea id="description" name="description" label="Instruction/Description" />
      <div>
        <label className="label-base">Status</label>
        <select name="section" id="section" className="input-base">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="space-x-2">
          <input type="checkbox" id="randomize_questions" name="randomize_questions" />
          <Text as="span" className="text-sm">
            Display Questions Randomly
          </Text>
        </label>
        <label className="space-x-2">
          <input type="checkbox" id="randomize_options" name="randomize_options" />
          <Text as="span" className="text-sm">
            Display Options Randomly
          </Text>
        </label>
      </div>
      <Button variant="default" size="sm">
        Submit
      </Button>
    </form>
  );
};

QuizzForm.displayName = "QuizzForm";
