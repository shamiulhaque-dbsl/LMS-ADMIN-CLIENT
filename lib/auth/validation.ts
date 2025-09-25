// import { z } from "zod";

// export const SignupFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Name must be at least 2 characters long." })
//     .trim(),
//   email: z.string().email({ message: "Please enter a valid email." }).trim(),
//   phone: z
//     .string()
//     .min(11, { message: "Phone number must be 11 digit" })
//     .max(11, { message: "Phone number must be 11 digit" })
//     .trim(),
//   password: z
//     .string()
//     .min(6, { message: "Password at least 5 characters long" })
//     .trim(),
// });

// export const LoginFormSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email." }).trim(),
//   password: z
//     .string()
//     .min(6, { message: "Password at least 5 characters long" }),
// });

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
