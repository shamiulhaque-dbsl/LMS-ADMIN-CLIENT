export function LoadingSpinner({ message = "Loading...", size = 48 }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="loader double-circle"></div>
      <div className="hidden">
        {message}
        {size}
      </div>
    </div>
  );
}
