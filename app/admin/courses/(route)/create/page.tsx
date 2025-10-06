import { PageHeader } from "@/components/page/PageHeader";
import ManageCourseCreation from "@/admin/courses/components/ManageCourseCreation";

/*
  Todo:
  1. Fetch categories from api and pass promise to managecoursecreation
*/
export default function CourseCreatePage() {
  return (
    <>
      <PageHeader title="Create New Course" />
      <ManageCourseCreation />
    </>
  );
}
