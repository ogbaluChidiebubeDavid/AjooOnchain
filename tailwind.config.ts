module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        "dark-50": "var(--dark-50)",
        "primary-200": "var(--primary-200)",
        "primary-50": "var(--primary-50)",
        "surface-50": "var(--surface-50)",
=======
        "danger-200": "var(--danger-200)",
        "dark-50": "var(--dark-50)",
        opacityprimary: "var(--opacityprimary)",
        opacitysecondary: "var(--opacitysecondary)",
        "primary-100": "var(--primary-100)",
        "primary-200": "var(--primary-200)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "secondary-100": "var(--secondary-100)",
        "secondary-200": "var(--secondary-200)",
        "success-100": "var(--success-100)",
        "surface-100": "var(--surface-100)",
        "surface-300": "var(--surface-300)",
        "surface-400": "var(--surface-400)",
        "surface-50": "var(--surface-50)",
        "surface-500": "var(--surface-500)",
>>>>>>> 2088e20 (Initial commit)
        "surface-900": "var(--surface-900)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      },
      fontFamily: {
        "body-lg": "var(--body-lg-font-family)",
        "body-md": "var(--body-md-font-family)",
<<<<<<< HEAD
        "body-xl": "var(--body-xl-font-family)",
        "heading-md": "var(--heading-md-font-family)",
        "heading-xl-bold": "var(--heading-xl-bold-font-family)",
=======
        "body-sm": "var(--body-sm-font-family)",
        "body-xl": "var(--body-xl-font-family)",
        caption: "var(--caption-font-family)",
        "heading-lg": "var(--heading-lg-font-family)",
        "heading-md": "var(--heading-md-font-family)",
        "title-lg": "var(--title-lg-font-family)",
>>>>>>> 2088e20 (Initial commit)
        "title-xl": "var(--title-xl-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};
