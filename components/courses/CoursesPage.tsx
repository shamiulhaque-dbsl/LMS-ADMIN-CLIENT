"use client";

import { useState } from "react";
import CourseCategoryNav from "./CourseCategoryNav";
import CourseCategorySection from "./CourseCategorySection";

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
  categories: Category[];
}

export default function CoursesPage({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("");

  const scrollToCategory = (categoryTitle: string) => {
    if (categoryTitle === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(categoryTitle.replace(/\s+/g, "-"));
    if (element) {
      const navbarHeight = 64;
      const stickyHeaderHeight = 100;
      const totalOffset = navbarHeight + stickyHeaderHeight;
      const y = element.getBoundingClientRect().top + window.pageYOffset - totalOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <CourseCategoryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        scrollToCategory={scrollToCategory}
      />

      <div className="py-10">
        {categories.map((category) => (
          <CourseCategorySection key={category.title} category={category} />
        ))}
      </div>
    </>
  );
}
