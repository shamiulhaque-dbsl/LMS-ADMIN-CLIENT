import DynamicIcon from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Taka from "@/components/ui/svg/taka";
import ReuseableImage from "@/components/ui/Image";
import Link from "next/link";
import Text from "@/components/ui/Text";
import CourseFeatures from "./CourseFeatures";

export default function CoursePricingCard() {
  return (
    <Card>
      <Card.Content className="p-5">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <ReuseableImage
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            width={500}
            height={200}
            alt="Course Preview"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary/40">
            <DynamicIcon
              name="playcircle"
              className="h-14 w-14 cursor-pointer text-white transition-transform hover:scale-110"
            />
          </div>
        </div>
        <div className="my-3 flex items-center justify-between">
          <Text variant="dark" as="span" className="flex items-center text-3xl font-bold">
            <Taka className="h-6 w-6" /> 10,000
          </Text>
          <Text as="span" variant="muted" className="text-lg line-through">
            199
          </Text>
        </div>
        <div className="space-y-3">
          <Link href="/checkout" className="mt-3 block" prefetch={false}>
            <Button variant="outline" className="w-full">
              <Text as="span" variant="gray">
                Enroll Now
              </Text>
            </Button>
          </Link>

          <Button variant="outlineGray" className="w-full">
            <Text as="span" variant="gray">
              Try Free Preview
            </Text>
          </Button>
        </div>

        {/* Course Features */}
        <CourseFeatures />

        {/* Share Button */}
        <Button className="mt-4 w-full text-sm">
          <DynamicIcon name="share" />
          Share this course
        </Button>
      </Card.Content>
    </Card>
  );
}
