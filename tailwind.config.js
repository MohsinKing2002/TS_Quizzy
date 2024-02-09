/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightgray: "#DEDEDE",
        lightsky: "#2596be",
        purple: "#3c2354",
        darkBg: "#1F2937",
        ligtdarkBg: "#2596be",
        lightBg: "#ffffff",
        // 'vio': "bg-violet-500"
      },
    },
  },
  plugins: [],
};
