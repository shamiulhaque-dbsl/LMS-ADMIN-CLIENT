import { PageHeader } from "@/components/page/PageHeader";
import { ManageCourseEdit } from "@/features/course";
import { getCourse } from "@/api/course";
import { getCategories } from "@/api/category";
import { getFormattedCourseMetadata } from "@/api/course";
import { use } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";

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
  if (!id) return <ErrorMessage message="Missing category ID" />;

  const course = use(fetchCourse(id));
  if (!course) {
    return <div>Course not found</div>;
  }

  const categories = use(fetchCategories());
  if (!categories) {
    return <div>Categories not found</div>;
  }

  const courseMetadata = use(fetchCourseMetadata());

  return (
    <>
      <PageHeader title="Update Course" />
      <ManageCourseEdit course={course} categories={categories} courseMetadata={courseMetadata} />
    </>
  );
}
