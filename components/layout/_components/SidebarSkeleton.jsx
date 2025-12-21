export const SidebarSkeleton = () => (
  <aside className="fixed top-0 left-0 z-40 h-screen w-64 transform-gpu transition-all duration-300 bg-white/95 backdrop-blur-xl border-r border-gray-200/60 sm:shadow-lg sm:shadow-gray-900/10">
    <div className="flex h-full flex-col">
      {/* Header skeleton */}
      <div className="border-b border-gray-200/60 px-6 py-4">
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse ml-auto" />
      </div>

      {/* Menu skeleton */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-5 bg-gray-200 rounded animate-pulse" />
        ))}
      </nav>
    </div>
  </aside>
);

SidebarSkeleton.displayName = "SidebarSkeleton";
