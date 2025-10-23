import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils/tailwind-utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outlineGray"
  | "default"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "", size = "md", className, ...props }, ref) => {
    const variants: Record<ButtonVariant, string> = {
      default: "bg-[#0f172a] text-[#f7f9fb] hover:bg-[#0f172a]/90",
      primary: "bg-web-primary text-white hover:bg-[#e34b1a] focus-visible:ring-web-primary",
      secondary: "bg-[#ff8566] text-white hover:bg-web-primary focus-visible:ring-[#ff8566]",
      outline: "border border-web-primary text-web-primary hover:bg-web-primary hover:text-white",
      outlineGray: "border border-input bg-background text-foreground hover:bg-[#0f172a]/5",
      ghost: "hover:bg-web-primary/10 text-web-primary",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-colors focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          sizes[size],
          variants[variant as ButtonVariant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
