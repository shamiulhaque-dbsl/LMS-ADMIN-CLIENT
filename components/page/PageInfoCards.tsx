import React from "react";
import { TrendingUp, TrendingDown, MoreHorizontal, ExternalLink } from "lucide-react";

// Enhanced type definitions with better extensibility
interface TrendData {
  value: number;
  isPositive?: boolean; // Auto-detect if not provided
  label?: string;
  period?: string; // "vs last month", "YoY", etc.
  showIcon?: boolean;
  customIcon?: React.ComponentType<any>;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ComponentType<any>;
  disabled?: boolean;
}

interface InfoCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  iconColor?: string; // Custom icon color override
  trend?: TrendData;
  actions?: ActionButton[];
  badge?: {
    text: string;
    variant?: "success" | "warning" | "error" | "info" | "neutral";
  };
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "indigo" | "pink" | "teal";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  customContent?: React.ReactNode; // For completely custom card content
  metadata?: Record<string, any>; // For additional data
}

interface InfoCardsProps {
  cards: InfoCard[];
  className?: string;
  gap?: "sm" | "md" | "lg";
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  variant?: "default" | "compact" | "detailed";
  onCardClick?: (card: InfoCard) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

// Enhanced color system with more variants
const colorConfig = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    iconBg: "bg-green-100",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    iconBg: "bg-red-100",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  gray: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-600",
    iconBg: "bg-gray-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-600",
    iconBg: "bg-pink-100",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600",
    iconBg: "bg-teal-100",
  },
};

const badgeColors = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
};

// Skeleton loader component
const CardSkeleton = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const heights = { sm: "h-24", md: "h-32", lg: "h-40" };

  return (
    <div
      className={`animate-pulse bg-white border border-gray-200 rounded-lg p-6 ${heights[size]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Individual card component for better organization
const InfoCardItem = ({
  card,
  variant,
  onCardClick,
}: {
  card: InfoCard;
  variant: InfoCardsProps["variant"];
  onCardClick?: InfoCardsProps["onCardClick"];
}) => {
  const colors = colorConfig[card.color || "blue"];
  const IconComponent = card.icon;
  const isClickable = card.clickable || card.onClick || onCardClick;

  // Auto-detect trend positivity if not specified
  const trendIsPositive = card.trend?.isPositive ?? (card.trend ? card.trend.value >= 0 : false);

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const handleClick = () => {
    if (card.onClick) card.onClick();
    if (onCardClick) onCardClick(card);
  };

  if (card.loading) {
    return <CardSkeleton size={card.size} />;
  }

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200
        ${sizeClasses[card.size || "md"]}
        ${isClickable ? "cursor-pointer hover:shadow-md hover:border-gray-300" : ""}
        ${variant === "compact" ? "p-4" : ""}
      `}
      onClick={isClickable ? handleClick : undefined}
    >
      {/* Custom content override */}
      {card.customContent ? (
        card.customContent
      ) : (
        <>
          {/* Header with icon, title, and badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              {IconComponent && (
                <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                  <IconComponent className={`h-5 w-5 ${card.iconColor || colors.text}`} />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                  {card.badge && (
                    <span
                      className={`
                      px-2 py-1 text-xs font-medium rounded-full border
                      ${badgeColors[card.badge.variant || "neutral"]}
                    `}
                    >
                      {card.badge.text}
                    </span>
                  )}
                </div>
                {variant === "detailed" && card.description && (
                  <p className="text-xs text-gray-500">{card.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Main value */}
          <div className="mb-3">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</span>
            {card.subtitle && <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>}
          </div>

          {/* Trend and actions row */}
          <div className="flex items-center justify-between">
            {card.trend ? (
              <div className="flex items-center gap-1">
                {card.trend.showIcon !== false && (
                  <>
                    {card.trend.customIcon ? (
                      <card.trend.customIcon className="h-4 w-4" />
                    ) : trendIsPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </>
                )}
                <span
                  className={`text-sm font-medium ${
                    trendIsPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.trend.value > 0 ? "+" : ""}
                  {card.trend.value}%
                </span>
                {card.trend.label && (
                  <span className="text-sm text-gray-500">{card.trend.label}</span>
                )}
                {card.trend.period && (
                  <span className="text-xs text-gray-400">{card.trend.period}</span>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {/* Action buttons */}
            {card.actions && card.actions.length > 0 && (
              <div className="flex items-center gap-2">
                {card.actions.map((action, index) => {
                  const ActionIcon = action.icon;
                  const buttonClasses = {
                    primary: "bg-blue-600 text-white hover:bg-blue-700",
                    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
                  };

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                      }}
                      disabled={action.disabled}
                      className={`
                        px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                        ${buttonClasses[action.variant || "ghost"]}
                        ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="flex items-center gap-1">
                        {ActionIcon && <ActionIcon className="h-3 w-3" />}
                        {action.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Main component
export default function InfoCards({
  cards,
  className = "",
  gap = "md",
  columns,
  variant = "default",
  onCardClick,
  loading = false,
  emptyState,
}: InfoCardsProps) {
  // Dynamic grid columns
  const getGridClasses = () => {
    if (columns) {
      const colClasses = [];
      if (columns.default) colClasses.push(`grid-cols-${columns.default}`);
      if (columns.sm) colClasses.push(`sm:grid-cols-${columns.sm}`);
      if (columns.md) colClasses.push(`md:grid-cols-${columns.md}`);
      if (columns.lg) colClasses.push(`lg:grid-cols-${columns.lg}`);
      if (columns.xl) colClasses.push(`xl:grid-cols-${columns.xl}`);
      if (columns["2xl"]) colClasses.push(`2xl:grid-cols-${columns["2xl"]}`);
      return colClasses.join(" ");
    }

    // Auto-responsive grid based on card count
    const count = cards.length;
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count === 4) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  // Show loading skeletons
  if (loading) {
    return (
      <div className={`grid ${getGridClasses()} ${gapClasses[gap]} ${className}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (cards.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div className={`grid ${getGridClasses()} ${gapClasses[gap]} ${className}`}>
      {cards.map((card) => (
        <InfoCardItem key={card.id} card={card} variant={variant} onCardClick={onCardClick} />
      ))}
    </div>
  );
}
