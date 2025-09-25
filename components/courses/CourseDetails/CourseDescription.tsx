import { Card } from "@/components/ui/Card";

export default function CourseDescription() {
  return (
    <Card className="max-w-full rounded-xl p-6">
      <Card.Title className="mb-4">Description</Card.Title>
      <Card.Content className="prose max-w-none space-y-4 text-sm text-primary sm:text-base">
        <p>
          This comprehensive course will take you from the basics to advanced concepts in modern web
          development using Next.js. Whether you&apos;re a beginner looking to level up your skills
          or an experienced developer wanting to master Next.js, this course has something for
          everyone.
        </p>
        <p>
          Through practical examples and real-world projects,; you&aposll learn how to build
          scalable, performant web applications using the latest features of Next.js 14+. ;
          We&aposll cover everything from routing and data fetching to deployment and optimization.
        </p>
        <p>You&apos;ll gain hands-on experience with:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Server and Client Components</li>
          <li>App Router and Layouts</li>
          <li>API Routes and Middleware</li>
          <li>Authentication and Authorization</li>
          <li>Database Integration</li>
          <li>Performance Optimization</li>
          <li>Testing and Deployment</li>
        </ul>
        <p>
          By the end of this course, you&apos;ll have the confidence and skills to build
          professional-grade web applications that are ready for production. Join thousands of
          successful students who have transformed their careers with this course.
        </p>
      </Card.Content>
    </Card>
  );
}
