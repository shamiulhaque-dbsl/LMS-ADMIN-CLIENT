import React, { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind-utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContent({ children, className }: Props) {
  return <div className={cn("text-white", className)}>{children}</div>;
}
