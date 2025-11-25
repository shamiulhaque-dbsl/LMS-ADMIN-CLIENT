import { use } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { ManageCourseEdit } from "@/features/course";
import { getCourse } from "@/api/course";
import { getCategories } from "@/api/category";
import { getFormattedCourseMetadata } from "@/api/course";
import { ErrorMessage } from "@/components/ErrorMessage";

/*
  #TODO:
  1. Implement proper error handling and loading states.
  2. Implement proper data fetching strategies as needed.
*/

const fetchCourse = async (id: string) => {
  try {
    const response = await getCourse(id);
    return response.data;
  } catch (error) {
    return null;
  }
};

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    return response.data;
  } catch (error) {
    return null;
  }
};

const fetchCourseMetadata = async () => {
  try {
    const response = await getFormattedCourseMetadata();
    return response.data;
  } catch (error) {
    return null;
  }
};

type props = {
  params: Promise<{ id: string }>;
};

export default function CourseEditPage({ params }: props) {
  const { id } = use(params);
  if (!id || Number.isNaN(Number(id))) return <ErrorMessage description="Invalid course ID" />;

  const course = use(fetchCourse(id));
  if (!course) {
    return <ErrorMessage description="Course not found" />;
  }

  const categories = use(fetchCategories());
  if (!categories) {
    return <ErrorMessage description="Categories not found" />;
  }

  const courseMetadata = use(fetchCourseMetadata());
  if (!courseMetadata) {
    return <ErrorMessage description="Course metadata not found" />;
  }

  return (
    <>
      <PageHeader title="Update Course" />
      <ManageCourseEdit course={course} categories={categories} courseMetadata={courseMetadata} />
    </>
  );
}
