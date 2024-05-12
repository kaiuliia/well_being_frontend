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
        "back-gray": "#EFF1F4",
        "main-light-green": "#A5BB5A",
        "main-secondary-gray": "#8B98AF",
        "custom-green": "#05413E",
        "custom-red": "#680010",
        "custom-orange": "#E98600",
        "custom-dark-green": "#526637",
      },
      background: {
        default: "#EFF1F4",
      },
    },
  },
  plugins: [],
};
