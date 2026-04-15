import { ErrorBoundary } from "react-error-boundary";
import { PageHeader } from "@/components/page/PageHeader";
import { ErrorMessage } from "@/components/ErrorMessage";
import ManageLiveClasses from "@/features/liveClasses/components/ManageLiveClasses";

export const revalidate = 0;

export default function LiveClassesPage() {
  return (
    <>
      <PageHeader title="Manage Live Classes" />

      <ErrorBoundary
        fallback={
          <div className="mb-4">
            <ErrorMessage message="Failed to load live classes" />
          </div>
        }
      >
        <ManageLiveClasses />
      </ErrorBoundary>

    </>
  );
}
