import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Grid } from "@/components/ui/grid";
import { ImageUpload } from "@/components/ui/uploads/image";

/*
  # Note:
  - This user form component use for both create and update user
*/

export const UserForm = () => {
  return (
    <form className="space-y-4">
      <Grid cols={2}>
        <Input id="first_name" name="first_name" label="First Name" required />
        <Input id="last_name" name="last_name" label="Last Name" required />
        <Input id="email" name="email" label="Email" required />
        <Input id="phone" name="phone" label="Phone" required />
      </Grid>
      <Input id="password" name="password" label="Password" required />
      <div>
        <label htmlFor="role" className="label-base">
          Role
        </label>
        <select className="input-base">
          <option value="" disabled>
            Select Role
          </option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <Textarea id="about" name="about" label="About" />
      <Textarea id="address" name="address" label="Address" />
      <Textarea
        id="professional_experience"
        name="professional_experience"
        label="Professional Experience"
      />
      <Textarea
        id="professional_experience_details"
        name="professional_experience_details"
        label="Professional Experience Details"
      />
      <Input id="facebook" name="facebook" label="Facebook" />
      <Input id="twitter" name="Twitter" label="Twitter" />
      <Input id="linkedin" name="linkedin" label="Linkedin" />

      <div className="space-y-4 pb-8">
        <label htmlFor="thumbnail" className="label-base">
          User Image
        </label>
        <ImageUpload
          size="lg"
          variant="circle"
          showEditButton={false}
          showUploadGuideline={false}
        />
      </div>

      <Button variant="default" size="sm">
        Submit
      </Button>
    </form>
  );
};

UserForm.displayName = "UserForm";
