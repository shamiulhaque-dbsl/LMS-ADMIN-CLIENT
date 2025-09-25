import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ReuseableImage from "@/components/ui/Image";
import Link from "next/link";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Taka from "@/components/ui/svg/taka";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface CourseProps {
  id: number;
  title: string;
  category?: string;
  image: string;
  startTime?: string;
  enrolled?: number;
  instructor?: string;
  rating?: string; // <--- update rating to be a string
  price: string;
}
export default function CourseCard({ course }: { course: CourseProps }) {
  return (
    <Card className="bg-card text-card-foreground hover:shadow-lg">
      <Card.Header className="relative mb-0">
        <ReuseableImage
          src={course.image}
          alt="Machine Learning Course"
          width={500}
          height={250}
          className="rounded-t-lg"
          paddingBottom="pb-[70%]"
        />
        <Badge className="absolute right-2 top-3 bg-web-yellow text-card-foreground">
          BESTSELLER
        </Badge>
      </Card.Header>
      <Card.Content className="p-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <Text as="span" className="text-card-foreground">
            {course.category}
          </Text>
          <div className="flex items-start">
            <DynamicIcon name="star" className="text-web-primary" />
            <Text as="span">{course.rating}</Text>
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

        {/* Description */}
        {/* <p className= text-sm mb-4">
            Master the essentials of machine learning with hands-on projects and
            real-world applications.
          </p> */}

        {/* Course Meta */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DynamicIcon name="clock" />
            <Text>12 weeks</Text>
          </div>
          <div className="flex items-center gap-1">
            <DynamicIcon name="user" />
            <Text>2.3k students</Text>
          </div>
          <div className="flex items-center gap-1">
            <DynamicIcon name="book" />
            <Text>24 lessons</Text>
          </div>
          <div className="flex items-center gap-1">
            <DynamicIcon name="panelbottom" />
            <Text>Self-paced</Text>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Text as="span" className="flex items-center text-lg font-bold text-card-foreground">
              <Taka className="h-5 w-5" />
              {course.price}
            </Text>
            <Text as="span" className="flex items-center text-sm font-medium line-through">
              199
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
