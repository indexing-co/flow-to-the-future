/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "control-panel": "url('/images/control-panel.png')",
        "purple-gradient":
          "linear-gradient(220deg, rgba(92, 3, 114, 0.39) 0%, rgba(4, 69, 34, 0.39) 100%);",
      },
      colors: {
        "green-1": "#74F64B",
      },
    },
  },
  plugins: [],
};
