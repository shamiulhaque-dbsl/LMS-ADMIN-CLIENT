import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Text from "@/components/ui/Text";

interface CourseSection {
  title: string;
  preview?: boolean;
  lessons: number;
  duration: string;
}

interface CourseContentCardProps {
  section: CourseSection;
}

export const CourseContentCard = ({ section }: CourseContentCardProps) => {
  return (
    <Card className="rounded-lg border">
      <Card.Content className="flex cursor-pointer flex-col items-start justify-between p-4 hover:bg-gray-50 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-4">
          <Text variant="dark">{section.title}</Text>
          {section.preview && <Badge variant="secondary">Preview</Badge>}
        </div>
        <Text as="div" variant="gray" className="text-sm">
          {section.lessons} lessons • {section.duration}
        </Text>
      </Card.Content>
    </Card>
  );
};

CourseContentCard.displayName = "CourseContentCard";
