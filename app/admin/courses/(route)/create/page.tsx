import { PageHeader } from "@/components/page/PageHeader";
import ManageCourseCreation from "./components/ManageCourseCreation";

export default function CourseCreatePage() {
  return (
    <>
      <PageHeader title="Create New Course" />
      <ManageCourseCreation />
    </>
  );
}
