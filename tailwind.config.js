/** @type {import('tailwindcss').Config} */
export default {
  content: ["./content/**/*.md", "./quartz/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

