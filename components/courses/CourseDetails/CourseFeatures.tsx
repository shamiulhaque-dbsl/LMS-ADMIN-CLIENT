import DynamicIcon from "@/components/ui/DynamicIcon";
import Text from "@/components/ui/Text";

export default function CourseFeatures() {
  return (
    <div className="mt-4 text-sm text-muted-foreground">
      <Text className="mb-2 font-medium text-primary">This course includes:</Text>
      <ul className="space-y-2">
        <li className="flex items-center">
          <DynamicIcon name="book" className="mr-2  text-web-primary" />
          <Text>42 hours on-demand video</Text>
        </li>
        <li className="flex items-center">
          <DynamicIcon name="globe" className="mr-2  text-web-primary" />
          <Text>Full lifetime access</Text>
        </li>
        <li className="flex items-center">
          <DynamicIcon name="user" className="mr-2 text-web-primary" />
          <Text>Access on mobile and TV</Text>
        </li>
        <li className="flex items-center">
          <DynamicIcon name="graduationcap" className="mr-2  text-web-primary" />
          <Text>Certificate of completion</Text>
        </li>
      </ul>
    </div>
  );
}
