import { cn } from "@/lib/utils/tailwind-utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHead({ children, className = "" }: Props) {
  return <div className={cn("mb-8 md:mb-12 leading-normal", className)}>{children}</div>;
}
