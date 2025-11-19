import { z } from "zod";

const nonEmptyString = z.string().trim().min(1, "This field is required");
const optionalString = z
  .string()
  .trim()
  .nullish() // accepts string | null | undefined
  .transform((val) => {
    if (val === null || val === undefined || val === "") return undefined;
    return val;
  });

// URL: optional, validate only if provided
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val), {
    message: "Please enter a valid URL",
  });

const decimalValidator = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val) && val >= 0, {
    message: "Must be a valid number (0 or positive)",
  })
  .optional();

export const CourseFormSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").optional(),
  shortDescription: optionalString,
  description: optionalString,
  courseType: nonEmptyString,
  status: nonEmptyString,
  category: z.coerce.number().min(1, "This field is required").positive("Invalid category"),
  level: optionalString,

  language: optionalString,
  duration: optionalString,

  thumbnail: optionalString,
  previewVideo: optionalString,
  previewUrl: optionalUrl,
  images: z.array(z.string()).optional().default([]),

  price: decimalValidator,
  discountPrice: decimalValidator,

  // Meta fields: optional, only check if provided
  metaTitle: optionalString,
  metaDescription: optionalString,
  metaKeywords: optionalString,

  courseForum: z.boolean().optional().default(false),
  downloadableContent: z.boolean().optional().default(false),
  certificateAvailable: z.boolean().optional().default(false),

  requirements: z.array(z.string()).optional().default([]).nullish(),
  learningOutcomes: z.array(z.string()).optional().default([]).nullish(),
  targetAudience: z.array(z.string()).optional().default([]).nullish(),
  faqs: z
    .array(z.object({ question: optionalString, answer: optionalString }))
    .optional()
    .default([])
    .nullish(),

  projects: z
    .array(z.object({ title: optionalString, image: optionalString, description: optionalString }))
    .optional()
    .default([])
    .nullish(),
});

// import { z } from "zod";

// // Reusable validators
// const nonEmptyString = z.string().trim().min(1, "This field is required");
// const optionalString = z.string().trim().optional();
// const optionalUrl = z.string().url("Please enter a valid video URL").optional();

// // --------------------------------------------------
// // Final Schema (Option B - Fully Optional Build Form)
// // --------------------------------------------------

// export const CourseFormSchema = z.object({
//   // Basic Info
//   title: z.string().trim().min(5, "Title must be at least 5 characters").optional(),
//   slug: optionalString,
//   shortDescription: optionalString,
//   description: optionalString,
//   courseType: optionalString,
//   status: optionalString,
//   category: optionalString,
//   level: optionalString,

//   // Info
//   language: optionalString,
//   duration: optionalString,

//   // Media
//   thumbnail: optionalString,
//   previewVideo: optionalString,
//   previewUrl: optionalString,
//   images: z.array(z.string()).optional().default([]),

//   // Pricing
//   price: optionalString,
//   discountPrice: optionalString,
//   currency: optionalString,

//   // SEO
//   metaTitle: optionalString,
//   metaDescription: optionalString,
//   metaKeywords: z.array(z.string()).optional().default([]),
//   ogImage: optionalString,

//   // Features
//   courseForum: z.boolean().optional().default(false),
//   downloadableContent: z.boolean().optional().default(false),
//   certificateAvailable: z.boolean().optional().default(false),

//   // Optional Arrays / Lists
//   requirements: z.array(z.string()).optional().default([]),
//   learningOutcomes: z.array(z.string()).optional().default([]),
//   targetAudience: z.array(z.string()).optional().default([]),

//   // FAQs
//   faqsTitle: z.array(z.string()).optional().default([]),
//   faqsDescription: z.array(z.string()).optional().default([]),

//   // Projects
//   projectsTitle: z.array(z.string()).optional().default([]),
//   projectsImage: z.array(z.string()).optional().default([]),
//   projectsDescription: z.array(z.string()).optional().default([]),
// });
