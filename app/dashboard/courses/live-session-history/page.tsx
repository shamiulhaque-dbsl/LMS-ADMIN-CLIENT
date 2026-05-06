import { ErrorMessage } from "@/components/ErrorMessage";
import { PageHeader } from "@/components/page/PageHeader";
import ManageLiveClassesHistory from "@/features/liveClasses/components/ManageLiveClassesHistory";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
export default function Page() {
  return (
    <>
      <PageHeader title="Manage Live Classes History" />

      <ErrorBoundary
        fallback={
          <div className="mb-4">
            <ErrorMessage message="Failed to load live classes history" />
          </div>
        }
      >
        <ManageLiveClassesHistory />
      </ErrorBoundary>

    </>
  );
}
