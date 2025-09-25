import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { SectionTitle } from "@/components/sections";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import CoursePricingCard from "./CoursePricingCard";

export default function CourseHero() {
  return (
    <Grid lg={3} gap={10} className="items-start">
      <Grid.Item lg={2} className="space-y-6">
        <div className="flex items-center space-x-2">
          <Badge className="bg-web-yellow text-primary">BESTSELLER</Badge>
          <Badge>UPDATED FOR 2024</Badge>
        </div>

        {/* Title & Description */}
        <SectionTitle className="text-left">
          Advanced Web Development with Next.js and Modern Tools
        </SectionTitle>
        <Text variant="muted">
          Master modern web development with Next.js, React, and cutting-edge tools. Build
          production-ready applications with best practices.
        </Text>

        {/* Rating & Stats */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <DynamicIcon key={i} name="star" className="fill-web-primary text-web-primary" />
          ))}
          <Text variant="muted">(4.9) • 2.3k Reviews</Text>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <Text as="div" variant="muted" className="flex items-center">
            <DynamicIcon name="user" />
            12,345 students
          </Text>
          <Text as="div" variant="muted" className="flex items-center">
            <DynamicIcon name="globe" />
            English
          </Text>
          <Text as="div" variant="muted" className="flex items-center">
            <DynamicIcon name="clock" />
            42 hours
          </Text>
        </div>

        {/* Instructor */}
        <div className="flex items-center space-x-3">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
            alt="Instructor"
            width={48}
            height={48}
            className="rounded-full border-2 border-[#e34b1a]"
          />
          <Text as="div" className="leading-tight">
            <Text variant="dark">John Smith</Text>
            <Text variant="muted" className="text-sm">
              Senior Web Developer & Instructor
            </Text>
          </Text>
        </div>
      </Grid.Item>
      {/* Right Content - Pricing Box */}
      <Grid.Item lg={1}>
        <CoursePricingCard />
      </Grid.Item>
    </Grid>
  );
}
