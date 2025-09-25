import { Card } from "@/components/ui/Card";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import Text from "@/components/ui/Text";

export default function CourseFeaturedReview() {
  return (
    <Card className="max-w-full p-6">
      <Card.Title className="mb-4">Featured Review</Card.Title>
      <Card.Content>
        <div className="mb-4 flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Reviewer"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <Text variant="dark">Sarah Johnson</Text>
            <div className="flex text-web-primary">
              <DynamicIcon name="star" />
              <DynamicIcon name="star" />
              <DynamicIcon name="star" />
              <DynamicIcon name="star" />
              <DynamicIcon name="star" />
            </div>
          </div>
        </div>
        <Text variant="muted" className="text-sm sm:text-base">
          &quot;This course exceeded my expectations. The instructor explains complex concepts
          clearly, and the projects helped me build a strong portfolio. Highly recommended!&quot;
        </Text>
      </Card.Content>
    </Card>
  );
}
