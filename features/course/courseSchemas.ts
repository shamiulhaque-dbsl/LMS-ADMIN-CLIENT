import { z } from "zod";

// Reusable validators
const nonEmptyString = z.string().trim().min(1, "This field is required");
const optionalString = z.string().trim().optional();
const optionalUrl = z.string().url("Please enter a valid video URL").optional();

// --------------------------------------------------
// Final Schema (Option B - Fully Optional Build Form)
// --------------------------------------------------

export const CourseFormSchema = z.object({
  // Basic Info
  title: z.string().trim().min(5, "Title must be at least 5 characters").optional(),
  slug: optionalString,
  shortDescription: optionalString,
  description: optionalString,
  courseType: nonEmptyString.optional(),
  status: nonEmptyString.optional(),
  category: nonEmptyString.optional(),
  level: nonEmptyString.optional(),

  // Info
  language: nonEmptyString.optional(),
  duration: nonEmptyString.optional(),

  // Media
  thumbnail: optionalString,
  previewVideo: optionalString,
  previewUrl: optionalUrl,
  images: z.array(z.string()).optional().default([]),

  // Pricing
  price: nonEmptyString.optional(),
  discountPrice: optionalString,
  currency: optionalString,

  // SEO
  metaTitle: optionalString,
  metaDescription: optionalString,
  metaKeywords: z.array(z.string()).optional().default([]),
  ogImage: optionalString,

  // Features
  courseForum: z.boolean().optional().default(false),
  downloadableContent: z.boolean().optional().default(false),
  certificateAvailable: z.boolean().optional().default(false),

  // Optional Arrays / Lists
  requirements: z.array(z.string()).optional().default([]),
  learningOutcomes: z.array(z.string()).optional().default([]),
  targetAudience: z.array(z.string()).optional().default([]),

  // FAQs
  faqsTitle: z.array(z.string()).optional().default([]),
  faqsDescription: z.array(z.string()).optional().default([]),

  // Projects
  projectsTitle: z.array(z.string()).optional().default([]),
  projectsImage: z.array(z.string()).optional().default([]),
  projectsDescription: z.array(z.string()).optional().default([]),
});
