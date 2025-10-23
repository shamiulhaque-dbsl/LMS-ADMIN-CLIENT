import { cn } from "@/lib/utils/tailwind-utils";

interface TextProps {
  variant?: "primary" | "muted" | "gray" | "white" | "dark" | "red";
  as?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Text = ({ variant = "gray", as = "p", className, style, children }: TextProps) => {
  const Tag = as;

  const variants = {
    primary: "text-primary",
    muted: "text-muted-foreground",
    gray: "text-gray-600",
    white: "text-white",
    dark: "text-primary",
    red: "text-red-900",
  };

  return (
    <Tag className={cn(variants[variant], className)} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
