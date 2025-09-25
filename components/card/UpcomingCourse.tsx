import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ReuseableImage from "@/components/ui/Image";
import { Clock, Users, Radio } from "lucide-react";
import Link from "next/link";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

interface CourseProps {
  id: number;
  title: string;
  category: string;
  image: string;
  startTime: string;
  enrolled: number;
  instructor: string;
  rating: string;
  price: string;
}
export default function UpcomingCourseCard({ course }: { course: CourseProps }) {
  return (
    <Card className="bg-card text-card-foreground hover:shadow-lg">
      <Card.Header className="relative mb-0">
        <ReuseableImage
          src={course.image}
          alt="Machine Learning Course"
          paddingBottom="pb-[70%]"
          width={500}
          height={250}
          className="rounded-t-lg"
        />
        <Badge className="absolute right-2 top-3 px-3 font-bold">
          <div className="flex items-center gap-2">
            <Radio className="h-3 w-3 animate-pulse" />
            LIVE
          </div>
        </Badge>
      </Card.Header>
      <Card.Content className="p-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <Text as="span" className="text-card-foreground">
            {course.category}
          </Text>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-web-primary" />
            <Text as="span">Starts in {course.startTime}</Text>
          </div>
        </div>

        {/* Title */}
        <Text
          as="h3"
          className="mb-5 mt-3 h-14 overflow-hidden text-ellipsis text-left text-lg font-bold leading-normal text-card-foreground"
        >
          <Link href={`/courses/` + course.id} className="inline-block">
            {course.title}
          </Link>
        </Text>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4" />
            <Text as="span" className="ml-2 text-sm">
              156 enrolled
            </Text>
          </div>

          <Link href={`/courses/` + course.id} className="block">
            <Button variant="primary" size="sm">
              See Details{" "}
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
}
