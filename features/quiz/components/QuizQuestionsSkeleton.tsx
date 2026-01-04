export const QuizQuestionsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center border-b p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-9 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
