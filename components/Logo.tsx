import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define type for size variants
type LogoSize = "small" | "default" | "large";

// Define props interface
interface DotLmsLogoProps {
  href?: string | null;
  size?: LogoSize;
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

// Size variant definitions
interface SizeVariant {
  container: string;
  text: string;
  spacing: string;
}

type SizeVariantsMap = {
  [key in LogoSize]: SizeVariant;
};

// Logo component with TypeScript types
const Logo: React.FC<DotLmsLogoProps> = ({
  href = "/",
  size = "default",
  showText = true,
  className = "",
}) => {
  // Size variants for the logo
  const sizeVariants: SizeVariantsMap = {
    small: {
      container: "w-8 h-8",
      text: "text-lg",
      spacing: "space-x-2",
    },
    default: {
      container: "w-9 h-9",
      text: "text-2xl",
      spacing: "space-x-3",
    },
    large: {
      container: "w-10 h-10",
      text: "text-3xl",
      spacing: "space-x-4",
    },
  };

  // Get the appropriate size variant
  const sizeClasses: SizeVariant = sizeVariants[size];

  // Logo content to make it reusable with or without Link
  const LogoContent: React.FC = () => (
    <div
      className={`group inline-flex items-end ${sizeClasses.spacing} transition-all duration-300 ${className}`}
    >
      <div className={`relative ${sizeClasses.container}`}>
        <div className="absolute inset-0 rotate-6 transform rounded-xl transition-transform duration-300 group-hover:rotate-12" />
        <div className="absolute inset-0.5 rounded-lg bg-navbar" />
        <span className="absolute inset-0 flex items-center justify-center bg-clip-text text-lg font-bold text-transparent">
          <Image src="/images/logo3.svg" alt="Skillvora Logo"
            width={100} height={100} className="h-full w-full object-contain" />
        </span>
      </div>

      {showText && (
        <span
          className={`${sizeClasses.text} bg-gradient-to-r from-web-primary to-gray-800 bg-clip-text font-bold text-transparent`}
        >
          Skillvora
        </span>
      )}
    </div>
  );

  // Return with or without link wrapper based on href
  if (href) {
    return (
      <Link href={href} className="block leading-normal" prefetch={false}>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default Logo;
