import { Icons } from "@/components/Icons";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils/tailwind-utils";

interface DynamicIconProps extends ComponentProps<"svg"> {
  name: keyof typeof Icons | string;
  className?: string;
}

export default function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const IconComponent = Icons[name as keyof typeof Icons];

  if (!IconComponent) return null;

  return <IconComponent className={cn("w-4, h-4", className)} {...props} />;
}
