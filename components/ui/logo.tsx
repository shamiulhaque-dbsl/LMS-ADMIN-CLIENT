import * as React from "react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils/tailwind-utils";

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-600">
        <Icons.alert className="h-4 w-4 text-white" />
      </div>
      <h1
        className={cn(
          "text-3xl font-extrabold tracking-tight text-gray-600 dark:text-white",
          className
        )}
      >
        <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          E
        </span>
        -Fake
        <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Alert
        </span>
      </h1>
    </div>
  );
};

export default Logo;
