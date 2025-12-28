import { QuizzForm } from "@/features/quiz/components/QuizzForm";
import { Card } from "@/components/ui/Card";
import { getCoursesForSelect } from "@/api/course";

export default async function ManageQuizCreate() {
  const res = await getCoursesForSelect();
  const courses = res?.data ?? [];

  return (
    <Card className="bg-white p-6">
      <Card.Content className="max-w-xl">
        <QuizzForm courses={courses} />
      </Card.Content>
    </Card>
  );
}
