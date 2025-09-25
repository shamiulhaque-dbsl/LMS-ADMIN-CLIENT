import StatsCard from "./StatsCard";
import { Award, BookOpen } from "lucide-react";

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Courses Enrolled"
          value="12"
          subtitle="3 in progress"
          icon={BookOpen}
          color="blue"
        />
        <StatsCard
          title="Completed Courses"
          value="8"
          subtitle="67% completion rate"
          icon={Award}
          color="green"
        />
        <StatsCard
          title="Certificates Earned"
          value="5"
          subtitle="This year"
          icon={Award}
          color="yellow"
        />
      </div>
    </div>
  );
}
