import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import DynamicIcon from "@/components/ui/DynamicIcon";
import ReuseableImage from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function EnrollCourseCard() {
  return (
    <Card>
      <Card.Header className="relative mb-0">
        <ReuseableImage
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800"
          alt="UI/UX Design course thumbnail"
          paddingBottom="pb-[70%]"
          width={500}
          height={250}
          className="w-full rounded-t-lg"
        />
        <Badge variant="secondary" className="absolute right-3 top-3">
          In Progress
        </Badge>
        <Badge variant="default" className="absolute bottom-3 left-3">
          15 Modules
        </Badge>
      </Card.Header>
      <Card.Content className="space-y-4 p-5">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <Card.Title className="line-clamp-2 text-lg leading-tight">
              Advanced Web Development with React & Node.js
            </Card.Title>
            <Badge className="bg-primary/10 text-primary">65%</Badge>
          </div>
          <Progress value={65} />
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex items-center">
            <DynamicIcon name="clock" className="mr-2 shrink-0" />
            <span>12 hours remaining</span>
          </div>
          <div className="flex items-center">
            <DynamicIcon name="calender" className="mr-2 shrink-0" />
            <span>Last accessed: Yesterday</span>
          </div>
        </div>

        <Link href="/dashboard/my-courses/next-js" className="block">
          <Button variant="primary" size="sm">
            Continue Learning
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
}
