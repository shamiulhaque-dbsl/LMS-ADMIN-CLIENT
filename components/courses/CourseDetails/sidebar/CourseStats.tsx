import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";

export default function CourseStats() {
  return (
    <Card className="max-w-full p-6">
      <Card.Title className="mb-4">Course Stats</Card.Title>
      <Card.Content className="space-y-3">
        <div className="flex justify-between">
          <Text as="span" variant="muted">
            Last updated
          </Text>
          <Text as="span" variant="dark" className="text-sm font-medium">
            March 2024
          </Text>
        </div>
        <div className="flex justify-between">
          <Text as="span" variant="muted">
            Skill level
          </Text>
          <Text as="span" variant="dark" className="text-sm font-medium">
            Intermediate
          </Text>
        </div>
        <div className="flex justify-between">
          <Text as="span" variant="muted">
            Certificate
          </Text>
          <Text as="span" variant="dark" className="text-sm font-medium">
            Yes
          </Text>
        </div>
        <div className="flex justify-between">
          <Text as="span" variant="muted">
            Subtitles
          </Text>
          <Text as="span" variant="dark" className="text-sm font-medium">
            5 languages
          </Text>
        </div>
      </Card.Content>
    </Card>
  );
}
