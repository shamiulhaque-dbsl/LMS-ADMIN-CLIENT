import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";

export default function CourseMoneyBack() {
  return (
    <Card className="max-w-full p-6">
      <Card.Title className="mb-4">30-Day Money-Back Guarantee</Card.Title>
      <Card.Content>
        <Text variant="muted" className="text-sm">
          Not satisfied with the course? Get a full refund within 30 days of purchase, no questions
          asked.
        </Text>
      </Card.Content>
    </Card>
  );
}
