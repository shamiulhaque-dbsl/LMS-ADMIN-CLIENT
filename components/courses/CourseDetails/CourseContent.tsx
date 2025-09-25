import { Card } from "@/components/ui/Card";
import { CourseContentCard } from "./card/CourseContentCard";

export default function CourseContent() {
  return (
    <Card className="max-w-full rounded-xl p-6">
      <Card.Title className="mb-4">Course Content</Card.Title>
      <Card.Content className="space-y-4 text-sm sm:text-base">
        {[
          {
            title: "Getting Started with Next.js",
            lessons: 5,
            duration: "2h 30m",
            preview: true,
          },
          {
            title: "Next.js Core Concepts",
            lessons: 8,
            duration: "4h 15m",
          },
          {
            title: "Building Real-World Applications",
            lessons: 12,
            duration: "8h 45m",
          },
          {
            title: "Advanced Features and Optimization",
            lessons: 10,
            duration: "6h 20m",
          },
          {
            title: "Testing and Deployment",
            lessons: 7,
            duration: "4h 30m",
          },
        ].map((section, index) => (
          <CourseContentCard key={index} section={section} />
        ))}
      </Card.Content>
    </Card>
  );
}
