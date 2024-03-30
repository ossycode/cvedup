import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        FannGrotesquePro: "FannGrotesquePro, sans-serif",
        FannGrotesqueProLightItalic: "FannGrotesqueProLightItalic, sans-serif",
        FannGrotesqueProBold: "FannGrotesqueProBold, sans-serif",
        FannGrotesqueProMid: "FannGrotesqueProMid, sans-serif",
        FannGrotesqueProBook: "FannGrotesqueProBook, sans-serif",
        FannGrotesqueProLight: "FannGrotesqueProLight, sans-serif",
        FannGrotesqueProBookItalic: "FannGrotesqueProBookItalic, sans-serif",
        FannGrotesqueProXLight: "FannGrotesqueProXLight, sans-serif",
        FannGrotesqueProExtraLightItalic:
          "FannGrotesqueProExtraLightItalic, sans-serif",
        FannGrotesqueProSemiBold: "FannGrotesqueProSemiBold, sans-serif",
      },
      colors: {
        azure: "#3A86FF",
        conflowerBlue: "#4C91FF",
        yaleBlue: "#002F7A",
        customGreen: "rgb(0, 211, 131)",
        accent: "#aedff8",
        "accent-foreground": "#0F121F",
        "muted-foreground": "#284D3D",
        primary: "#0D1E1D",
        "primary-foreground": "#CFE8FF",
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
  },
  plugins: [],
};
export default config;
