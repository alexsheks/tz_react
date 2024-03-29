module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../public/hello.svg')",
        "contacts-pattern": "url('../public/Animated Shape.svg')",
      },
    },
  },
  plugins: [],
};
