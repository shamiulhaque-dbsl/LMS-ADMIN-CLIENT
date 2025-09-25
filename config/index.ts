// import { z } from "zod";

// // Define environment variable schema
// const envSchema = z.object({
//   NODE_ENV: z
//     .enum(["development", "production", "test"])
//     .default("development"),
//   LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
//   DATABASE_URL: z.string().url(),
// });

// // Parse and validate environment variables
// export const ENV = (() => {
//   try {
//     return envSchema.parse(process.env);
//   } catch (err) {
//     console.error("Invalid environment configuration", err);
//     process.exit(1);
//   }
// })();

// // Logging configuration based on environment
// export const loggerConfig = {
//   level: ENV.LOG_LEVEL,
//   console: ENV.NODE_ENV !== "production",
//   file: {
//     enabled: true,
//     path: "./logs",
//   },
// };
