import { PageHeader } from "@/components/page/PageHeader";
import ManageCourseCreation from "@/features/course/components/ManageCourseCreation";

import { getCategories } from "@/api/category";
import { getFormattedCourseMetadata } from "@/api/course";
import { use } from "react";

/*
  Todo:
  1. Fetch categories from api and pass promise to managecoursecreation
*/

const fetchCategories = async () => (await getCategories()).data ?? [];
const fetchCourseMetadata = async () => (await getFormattedCourseMetadata()).data ?? null;

export default function CourseCreatePage() {
  const categories = use(fetchCategories());
  const courseMetadata = use(fetchCourseMetadata());

  return (
    <>
      <PageHeader title="Create New Course" />
      <ManageCourseCreation categories={categories} courseMetadata={courseMetadata} />
    </>
  );
}
