const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'red-orange': '#fe4a22',
      'yellow-sunglow': '#ffd026',
      'onyx': '#383838',
      'light-silver': '#d9d9d9'
    }
  },
  darkMode: "class",
  plugins: [heroui()]
}

