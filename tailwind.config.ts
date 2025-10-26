import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        // Website base color
        web: {
          primary: {
            DEFAULT: "#ff693d",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#ff8566",
            foreground: "#ffffff",
          },
          accent: {
            DEFAULT: "#e34b1a",
            foreground: "#ffffff",
          },
          destractive: {
            DEFAULT: "#FFF0EB",
            foreground: "#ff693d",
          },
          yellow: {
            DEFAULT: "#FFDA49",
            foreground: "#ffffff",
          },
        },

        navbar: {
          DEFAULT: "#ffffff",
          foreground: "#0A0A0B",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Neutral tones (useful for borders, borders, muted text, etc.)
        neutral: {
          light: "#f5f5f5",
          medium: "#d1d1d1",
          dark: "#333333",
        },

        // Muted or less emphasized text
        text: {
          muted: "#9f9797",
          dark: "#171717",
          light: "#ffffff",
        },

        // Dark mode specific colors
        dark: {
          background: "#1e1e1e",
          border: "#2a2a2a",
          text: {
            primary: "#ffffff",
            secondary: "#999999",
          },
        },

        // Link-related colors
        link: {
          DEFAULT: "#0070f3",
          hover: "#0060f2",
        },

        // badge colors
        badge: {
          default: "hsl(var(--secondary))",
          info: "#0070f3",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },

        peachLight30: "rgba(255, 248, 241, 0.3)", // Light peach with transparency
      },

      fontFamily: {
        heading: ["Inter", "Poppins", "sans-serif"],
        body: ["Source Sans Pro", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
