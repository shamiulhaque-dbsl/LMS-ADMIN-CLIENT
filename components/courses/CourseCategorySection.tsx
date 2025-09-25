import CourseCard from "@/components/card/Course";
import { SectionWrapper } from "@/components/sections";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";

interface Category {
  title: string;
  courses: {
    id: number;
    title: string;
    category: string;
    image: string;
    startTime: string;
    enrolled: number;
    instructor: string;
    rating: string;
    price: string;
  }[];
}

interface Props {
  category: Category;
}

export default function CourseCategorySection({ category }: Props) {
  return (
    <SectionWrapper
      id={category.title.replace(/\s+/g, "-")}
      padding="py-0"
      className="mb-14 transition-all duration-300"
    >
      <div className="mb-8">
        <Text as="h2" variant="dark" className="text-xl font-medium">
          {category.title}
        </Text>
        <div className="mt-2 h-1 w-20 rounded bg-web-primary"></div>
      </div>
      <Grid md={2} lg={3} gap={8}>
        {category.courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </Grid>
    </SectionWrapper>
  );
}
