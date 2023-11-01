/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,jsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
