module.exports = {
  theme: {
    extend: {
      keyframes: {
        "tooltip-pop": {
          "0%": { opacity: "0", transform: "scale(0.5) rotate(0deg)" },
          "60%": { opacity: "1", transform: "scale(1.1) rotate(3deg)" },
          "80%": { transform: "scale(0.95) rotate(-2deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "tooltip-pop": "tooltip-pop 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-in forwards",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
};
