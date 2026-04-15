import { use } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { getLiveSessionById } from "@/api/live-session";
import ManageLiveClassEdit from "@/features/liveClasses/components/ManageLiveClassEdit";
import { getCourses } from "@/api/course";

/*
  #TODO:
  1. Implement proper error handling and loading states.
  2. Implement proper data fetching strategies as needed.
*/

const fetchLiveSession = async (id: string) => {
  try {
    const response = await getLiveSessionById(id);
    return response.data;
  } catch (err) {
    console.error("Error fetching live session:", err);
    return null;
  }
};

const fetchCourses = async () => (await getCourses()).data ?? [];


type props = {
  params: Promise<{ id: string }>;
};

export default function LiveClassEditPage({ params }: props) {
  const { id } = use(params);
  if (!id || Number.isNaN(Number(id))) return <ErrorMessage description="Invalid live session ID" />;
  const courses = use(fetchCourses());

  const session = use(fetchLiveSession(id));
  if (!session) {
    return <ErrorMessage description="Live Class not found" />;
  }


  return (
    <>
      <PageHeader title="Update Live Class" />
      <ManageLiveClassEdit
        courses={courses}
        liveClass={session}
      />
    </>
  );
}
