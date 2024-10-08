/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "medium-gray": "#989898",
        "back-gray": "#EFF1F4",
        "main-orange": "#d27600",
        "main-button": "#6f5abb",
        "main-secondary-gray": "#8B98AF",
        "scale-dark": "#178074",
        "scale-medium": "#d27600",
        "scale-light": "#7a002e",
        "custom-dark-green": "#135964",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      //
      // background: {
      //   default: "#EFF1F4",
      // },
      // colors: {
      //   "back-gray": "#EFF1F4",
      //   "main-light-green": "#A5BB5A",
      //   "main-button": "#ffa732",
      //   "main-secondary-gray": "#8B98AF",
      //   "scale-dark": "#05413E",
      //   "scale-light": "#680010",
      //   "scale-medium": "#E98600",
      //   "custom-dark-green": "#526637",
      // },
      background: {
        default: "#EFF1F4",
      },

      // colors: {
      //   "back-gray": "#EFF1F4",
      //   "main-light-green": "#94c55a",
      //   "main-button": "#6f5abb",
      //   "main-secondary-gray": "#8B98AF",
      //   "scale-dark": "#0e3e44",
      //   "scale-medium": "#2e717a",
      //   "scale-light": "#92cdd0",
      //   "custom-dark-green": "#526637",
      // },
      // background: {
      //   default: "#EFF1F4",
      // },
    },
  },
  plugins: [],
};
