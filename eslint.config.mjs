import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import js from "@eslint/js";
// import prettierConfig from "eslint-config-prettier";
// import prettierPlugin from "eslint-plugin-prettier";
// import tailwind from "eslint-plugin-tailwindcss";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// export default [
//   {
//     ignores: ["node_modules", ".next", "out", "dist"],
//   },
//   // Base JS rules
//   js.configs.recommended,

//   // Next.js configs (with TS support)
//   ...compat.extends("next/core-web-vitals", "next/typescript"),

//   // Prettier config
//   prettierConfig,

//   // Tailwind plugin
//   {
//     plugins: {
//       tailwindcss: tailwind,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       "tailwindcss/classnames-order": "warn",
//       "tailwindcss/no-custom-classname": "off",
//       "no-unused-vars": "off",
//       "no-console": ["warn", { allow: ["warn", "error"] }],
//       "react/react-in-jsx-scope": "off",
//       "prettier/prettier": [
//         "error",
//         {
//           endOfLine: "auto",
//         },
//       ],
//     },
//   },
// ];
