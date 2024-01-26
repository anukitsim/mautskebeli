/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-georgian': ['Noto Sans Georgian', 'sans-serif'],
      },
      screens: {
        'sm': '340px',
        "md": '1300px'
      }
    },
  },
  plugins: [],
}
