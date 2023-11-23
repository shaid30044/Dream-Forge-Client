/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        julius: ["Julius Sans One", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },

      colors: {
        primary: "#f15859",
        primary1: "#feeeee",
        primary2: "#fbdede",
        dark1: "#121212",
        dark2: "#444444",
        dark3: "#737373",
        dark4: "#A1A1A1",
        dark5: "#D0D0D0",
        dark6: "#E8E8E8",
        dark7: "#F3F3F3",
        dark8: "#D9D9D9",
        dark9: "#F6F6F6",
        brown1: "#BB8506",
        brown2: "#CD9003",
        brown3: "#D99904",
        brown4: "#D1A054",
        blue: "#007AFF",
        yellow: "#EEFF25",
        red: "#B91C1C",
        black1: "#111827",
        black2: "#1F2937",
        black3: "#151515B2",
        black4: "#15151580",
      },
    },
  },
  plugins: [require("daisyui")],
};
