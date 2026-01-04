import { PageHeader } from "@/components/page/PageHeader";
import ManageQuizz from "@/features/quiz/ManageQuizz";

interface PageProps {
  searchParams: Promise<{
    dateFrom?: string;
    dateTo?: string;
    course?: string;
    instructor?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    dateFrom: params.dateFrom ?? "",
    dateTo: params.dateTo ?? "",
    course: params.course ?? "",
    instructor: params.instructor ?? "",
    status: params.status ?? "",
    page: Number(params.page ?? 1),
  };

  return (
    <>
      <PageHeader title="Manage Quizzes" />
      <ManageQuizz filters={filters} />
    </>
  );
}
