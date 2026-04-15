import { PageHeader } from "@/components/page/PageHeader";
import { getCourses } from "@/api/course";
import { use } from "react";
import ManageLiveClassCreation from "@/features/liveClasses/components/ManageLiveClassCreation";

const fetchCourses = async () => (await getCourses()).data ?? [];

export default function LiveClassCreatePage() {
  const courses = use(fetchCourses());

  return (
    <>
      <PageHeader title="Create New Live Class" />
      <ManageLiveClassCreation courses={courses} />
    </>
  );
}
