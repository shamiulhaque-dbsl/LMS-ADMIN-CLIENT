import { Icon } from "@/components/Icons";
import { Card } from "@/components/ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: Icon;
  color?: "blue" | "green" | "yellow" | "purple";
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}: StatsCardProps) {
  const colors: Record<NonNullable<StatsCardProps["color"]>, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col-reverse items-start justify-between gap-4 xl:flex-row">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div className={`rounded-lg p-3 ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
