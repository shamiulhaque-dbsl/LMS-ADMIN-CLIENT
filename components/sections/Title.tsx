import React, { ReactNode } from "react";
import { cn } from "@/utils/tailwind-utils";
import Text from "@/components/ui/Text";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: Props) {
  return (
    <Text
      as="h2"
      variant="primary"
      className={cn("text-center text-2xl md:text-4xl font-bold sm:mb-2", className)}
    >
      {children}
    </Text>
  );
}
