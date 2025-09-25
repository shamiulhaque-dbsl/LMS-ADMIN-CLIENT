// import React, { ReactNode } from "react";
// import { cn } from "@/utils/tailwind-utils";

// interface Props {
//   children: ReactNode;
//   className?: string;
// }

// export default function SectionWrapper({ children, className }: Props) {
//   return (
//     <section
//       className={cn("bg-peachLight30 pt-10 pb-10 sm:pt-16 sm:pb-16", className)}
//     >
//       {children}
//     </section>
//   );
// }

import React, { ReactNode } from "react";
import { cn } from "@/utils/tailwind-utils";

type Variant = "default" | "light" | "dark" | "brand" | "custom" | "none";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: Variant;
  padding?: string;
  margin?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white",
  light: "bg-gray-50",
  dark: "bg-gray-900 text-white",
  brand: "bg-gradient-to-r from-web-primary to-web-secondary text-white",
  custom: "bg-peachLight30",
  none: "bg-transparent",
};

export default function SectionWrapper({
  children,
  className,
  id,
  as: Tag = "section",
  variant = "default",
  padding = "py-10 sm:py-16",
  margin,
  fullWidth = true,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        variantStyles[variant],
        padding,
        margin,
        !fullWidth && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}
