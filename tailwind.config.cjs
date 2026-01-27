/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '600': '600px',
       }
    },
  },
  plugins: [
    require("tailwindcss-inner-border"),
  ],
}