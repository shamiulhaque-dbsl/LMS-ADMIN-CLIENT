import { QuizzForm } from "@/features/quiz/components/QuizzForm";
import { Card } from "@/components/ui/Card";
import { getCoursesForSelect } from "@/api/course";
import { use } from "react";

export default function ManageQuizCreate() {
  const { data: courses = [] } = use(getCoursesForSelect());

  return (
    <Card className="bg-white p-6">
      <Card.Content className="max-w-xl">
        <QuizzForm courses={courses} />
      </Card.Content>
    </Card>
  );
}
