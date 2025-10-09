import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import { AssignmentMetric } from "@/admin/assignments/types/type-matric";

const AssignmentMetrics: AssignmentMetric[] = [
  {
    title: "Course Assignments",
    value: "12",
  },
  {
    title: "Pending Review",
    value: "567",
  },
  {
    title: "Passed",
    value: "89",
  },
  {
    title: "Failed",
    value: "20",
  },
];

export default function AssignmentInfo() {
  return (
    <Grid cols={2} md={4} lg={4} className="mb-6">
      {AssignmentMetrics.map((metric, index) => {
        return (
          <Card
            key={index}
            className="border-none group relative overflow-hidden transition-all bg-white"
          >
            <Card.Content className="p-4 sm:p-6">
              <Text
                as="div"
                variant="muted"
                className="text-xs sm:text-base font-semibold leading-tight mb-3"
              >
                {metric.title}
              </Text>

              <div className="relative">
                <Text
                  as="div"
                  variant="dark"
                  className="text-xl sm:text-2xl font-semibold tabular-nums tracking-tight leading-none"
                >
                  {metric.value}
                </Text>

                {/* Value underline decoration */}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card.Content>

            {/* Hover effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-white/50 to-gray-50/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
          </Card>
        );
      })}
    </Grid>
  );
}
