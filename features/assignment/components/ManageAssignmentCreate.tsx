import { Card } from "@/components/ui/Card";
import { getCoursesForSelect } from "@/api/course";
import { use } from "react";
import AssignmentForm from "./form/AssignmentForm";

export default function ManageAssignmentCreate() {
  const { data: courses = [] } = use(getCoursesForSelect());
  return (
    <Card className="bg-white p-6">
      <Card.Content className="max-w-xl">
        <AssignmentForm courses={courses} />
      </Card.Content>
    </Card>
  );
}
