import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";

export default function CourseRequirements() {
  return (
    <section id="requirements">
      <Card className="max-w-full rounded-xl p-6">
        <Card.Title className="mb-4">Requirements</Card.Title>
        <Card.Content className="text-sm sm:text-base">
          <ul className="ml-4 list-disc space-y-2">
            <li>
              <Text as="span" variant="dark">
                Basic understanding of HTML, CSS, and JavaScript
              </Text>
            </li>
            <li>
              <Text as="span" variant="dark">
                Familiarity with React.js fundamentals
              </Text>
            </li>
            <li>
              <Text as="span" variant="dark">
                A computer with Node.js installed
              </Text>
            </li>
            <li>
              <Text as="span" variant="dark">
                Willingness to learn and practice
              </Text>
            </li>
          </ul>
        </Card.Content>
      </Card>
    </section>
  );
}
