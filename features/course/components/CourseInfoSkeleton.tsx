import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/grid";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CourseInfoSkeleton() {
  return (
    <Grid cols={2} md={4} lg={5} className="mb-6">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="relative overflow-hidden border-none bg-white transition-all">
          <Card.Content className="p-4 sm:p-6">
            <Skeleton className="mb-3 h-4 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </Card.Content>
        </Card>
      ))}
    </Grid>
  );
}
