import StatsCard from "./StatsCard";
import { BookOpen, UsersRound } from "lucide-react";

export default function OverviewTab({ profileData }: { profileData: any }) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        <StatsCard
          title="Enrolled Students"
          value={profileData?.meta?.enrolledStudents || 0}
          subtitle="total students"
          icon={UsersRound}
          color="purple"
        />
        <StatsCard
          title="Enrolled Courses"
          value={profileData?.meta?.enrolledCourses || 0}
          subtitle="total courses"
          icon={BookOpen}
          color="blue"
        />
        {/* <StatsCard
          title="Completed Courses"
          value={profileData?.meta?.completedCourses || 0}
          subtitle={`${profileData?.meta?.completedCourses || 0} of ${profileData?.meta?.enrolledCourses || 0}`}
          icon={Award}
          color="green"
        /> */}
      </div>
    </div>
  );
}
