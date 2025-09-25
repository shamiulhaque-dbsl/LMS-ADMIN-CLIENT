import { Card } from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Text from "@/components/ui/Text";

interface CourseLearningCardProps {
  item: string;
}

export const CourseLearningCard = ({ item }: CourseLearningCardProps) => {
  return (
    <Card className="border-none">
      <Card.Content className="flex flex-row items-start leading-normal">
        <DynamicIcon name="checkcircle" className="mr-2 mt-0.5 flex-shrink-0 text-web-primary" />
        <Text as="span" variant="dark">
          {item}
        </Text>
      </Card.Content>
    </Card>
  );
};

CourseLearningCard.displayName = "CourseLearningCard";
