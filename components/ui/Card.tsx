import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind-utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card border text-card-foreground rounded-xl transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }: CardComponentProps) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }: CardComponentProps) => (
  <h3 className={cn("text-xl font-semibold text-gray-900", className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }: CardComponentProps) => (
  <p className={cn("mt-2 text-sm text-gray-600", className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }: CardComponentProps) => (
  <div className={cn(className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }: CardComponentProps) => (
  <div className={cn("mt-4 flex items-center", className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
