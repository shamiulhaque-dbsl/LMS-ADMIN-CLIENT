import { use } from "react";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import type { CourseMetricResponse } from "@/features/course/types";
import { formatCourseMetrics } from "@/features/course/lib/utils";

type CourseMetricProps = {
  fetchCourseMetrics: () => Promise<CourseMetricResponse | null>;
};

export default function CourseInfo({ fetchCourseMetrics }: CourseMetricProps) {
  const metrics = use(fetchCourseMetrics());
  const formattedMetrics = formatCourseMetrics(metrics);

  if (!formattedMetrics.length) return null;

  return (
    <Grid cols={2} md={4} lg={5} className="mb-6">
      {formattedMetrics.map((metric, index) => {
        return (
          <Card
            key={index}
            className="group relative overflow-hidden border-none bg-white transition-all"
          >
            <Card.Content className="p-4 sm:p-6">
              <Text
                as="div"
                variant="muted"
                className="mb-3 text-xs font-semibold leading-tight sm:text-base"
              >
                {metric.title}
              </Text>

              <div className="relative">
                <Text
                  as="div"
                  variant="dark"
                  className="text-xl font-semibold tabular-nums leading-none tracking-tight sm:text-2xl"
                >
                  {metric.value}
                </Text>

                {/* Value underline decoration */}
                <div className="absolute -bottom-1 left-0 h-0.5 w-8 rounded-full bg-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </Card.Content>

            {/* Hover effects */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/0 via-white/50 to-gray-50/20 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
          </Card>
        );
      })}
    </Grid>
  );
}
