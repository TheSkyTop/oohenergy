import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1668E3",
          bg: "#F7F7F5",
          ink: "#202A36",
          muted: "#5A6472",
          rule: "#E4E4E0"
        }
      },
      textColor: {
        copy: "#5A6472"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Outfit", "Poppins", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
