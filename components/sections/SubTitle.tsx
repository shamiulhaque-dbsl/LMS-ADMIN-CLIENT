import React, { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind-utils";
import Text from "@/components/ui/Text";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionSubTitle({ children, className }: Props) {
  return (
    <Text
      as="p"
      variant="muted"
      className={cn("max-w-2xl mx-auto text-center text-base sm:text-lg", className)}
    >
      {children}
    </Text>
  );
}
