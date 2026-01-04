import { z } from "zod";

export const questionOptionSchema = z.object({
  option: z.string().min(1, "Option text is required").max(500, "Option too long"),
  isCorrect: z.boolean(),
});

export const questionSchema = z
  .object({
    question: z
      .string()
      .min(5, "Question must be at least 5 characters")
      .max(1000, "Question too long"),

    explanation: z.string().max(2000, "Explanation too long").optional().or(z.literal("")),

    questionType: z.enum(["single_choice", "multiple_choice", "true_false"]),

    point: z.number().min(1, "Point must be at least 1").max(100, "Point cannot exceed 100"),

    options: z
      .array(questionOptionSchema)
      .min(2, "At least 2 options required")
      .max(10, "Maximum 10 options allowed"),
  })
  .superRefine((data, ctx) => {
    const correct = data.options.filter((o) => o.isCorrect);

    if (correct.length === 0) {
      ctx.addIssue({
        path: ["options"],
        message: "At least one correct answer must be selected",
        code: z.ZodIssueCode.custom,
      });
    }

    // if (data.questionType === "single_choice" || data.questionType === "true_false") {
    //   if (correct.length !== 1) {
    //     ctx.addIssue({
    //       path: ["options"],
    //       message: "Exactly one correct answer is required",
    //       code: z.ZodIssueCode.custom,
    //     });
    //   }
    // }
  });

export type QuestionFormValues = z.infer<typeof questionSchema>;
