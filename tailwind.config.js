/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      desktop: "1024px",
    },
    fontFamily: {
      diplomatic: ["Diplomata SC", "cursive"],
    },
    plugins: [],
  },
};
