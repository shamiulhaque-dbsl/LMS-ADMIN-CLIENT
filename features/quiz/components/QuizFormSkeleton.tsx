export function QuizFormSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
      <div className="space-y-4">
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
        <div className="h-24 bg-gray-100 rounded animate-pulse" />
        <div className="h-10 bg-gray-100 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}
