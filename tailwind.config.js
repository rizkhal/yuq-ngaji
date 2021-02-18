module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{vue, js}"],
    options: {
      whitelist: ["mode-dark"],
    },
  },
  darkMode: "media", // or 'media' or 'class' or false
  theme: {
    darkSelector: ".mode-dark",
    extend: {
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1s ease-in-out infinite",
      },
    },
  },
  variants: {
    backgroundColor: ["hover", "responsive", " focus", "dark", "dark-hover"],
    textColor: ["hover", "responsive", "focus", "dark", "dark-hover"],
  },
  plugins: [require("tailwindcss-dark-mode")(), require("@tailwindcss/ui")],
};
