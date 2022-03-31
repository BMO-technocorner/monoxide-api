module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Montserrat",
        ...require("tailwindcss/defaultTheme").fontFamily.sans,
      ],
    },
    screens: {
      sm: "640px",
      md: "848px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    scrollbar: ["dark"],
  },
  plugins: [require("tailwind-scrollbar")],
};
