import { cn } from "@/utils/tailwind-utils";

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("max-w-7xl mx-auto px-4 lg:px-6", className)}>{children}</div>
);

export default Container;
