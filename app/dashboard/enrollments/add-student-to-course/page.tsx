import { PageHeader } from "@/components/page/PageHeader";
import AddStudentToCourse from "@/features/enrollments/components/AddStudentToCourse";
import { getCoursesForSelect } from "@/api/course";
import { use } from "react";

const fetchCourses = async () => (await getCoursesForSelect()).data ?? [];

export default function AddStudentToCoursePage() {
  const courses = use(fetchCourses());

  return (
    <>
      <PageHeader title="Add Student to Course" />
      <AddStudentToCourse courses={courses} />
    </>
  );
}
