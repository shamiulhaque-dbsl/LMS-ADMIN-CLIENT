"use client";

import { Button } from "@/components/ui/Button";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { useScrollButtons } from "./hooks/useScrollButtons";
import { CATEGORY_WITH_COURSES } from "@/lib/data/course";
import { Card } from "@/components/ui/Card";

interface Props {
  activeCategory: string;
  setActiveCategory: (title: string) => void;
  scrollToCategory: (title: string) => void;
}

export default function CourseCategoryNav({
  activeCategory,
  setActiveCategory,
  scrollToCategory,
}: Props) {
  const { ref, canScrollLeft, canScrollRight, scroll } = useScrollButtons();

  return (
    <Card className="sticky top-20 z-40 max-w-full">
      <Card.Content className="px-4 py-4">
        <div className="relative">
          {canScrollLeft && (
            <Button
              size="sm"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 w-8 -translate-y-1/2
                           rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-gray-50"
            >
              <DynamicIcon name="chevronLeft" className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}

          <div
            ref={ref}
            className="scrollbar-hide flex gap-3 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Button
              onClick={() => {
                setActiveCategory("");
                scrollToCategory("");
              }}
              variant="outlineGray"
              className={`whitespace-nowrap px-3 text-sm transition-all duration-200 hover:bg-web-primary hover:text-white ${
                !activeCategory ? "bg-web-primary text-white" : ""
              }`}
            >
              All Courses
            </Button>
            {CATEGORY_WITH_COURSES.map(({ title }) => (
              <Button
                key={title}
                onClick={() => {
                  setActiveCategory(title);
                  scrollToCategory(title);
                }}
                variant="outlineGray"
                className={`whitespace-nowrap px-3 text-sm transition-all duration-200 hover:bg-web-primary hover:text-white ${
                  activeCategory === title ? "bg-web-primary text-white" : ""
                }`}
              >
                {title}
              </Button>
            ))}
          </div>

          {canScrollRight && (
            <Button
              size="sm"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 w-8 -translate-y-1/2
                           rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-gray-50"
            >
              <DynamicIcon name="chevronRight" className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
