import { Card } from "@/components/ui/Card";
import { CourseLearningCard } from "./card/CourseLearningCard";

const learningPoints: string[] = [
  "Build modern, production-ready web applications",
  "Master Next.js 14+ features and best practices",
  "Implement authentication and authorization",
  "Create responsive, accessible user interfaces",
  "Deploy applications to various platforms",
  "Optimize performance and SEO",
  "Handle state management effectively",
  "Write clean, maintainable code",
  "Implement CI/CD pipelines",
  "Master Git workflow and collaboration",
  "Debug and troubleshoot effectively",
  "Write comprehensive tests",
];

export default function CourseWhatYouWillLearn() {
  return (
    <Card className="max-w-full rounded-xl p-6">
      <Card.Title className="mb-4">What you&apos;ll learn</Card.Title>
      <Card.Content className="grid gap-4 text-sm sm:text-base md:grid-cols-2">
        {learningPoints.map((item, index) => (
          <CourseLearningCard key={index} item={item} />
        ))}
      </Card.Content>
    </Card>
  );
}
