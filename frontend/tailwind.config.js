/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greekblue: '#0D5EAF',
      },
      backgroundImage: {
        'greek-blue-gradient': 'linear-gradient(135deg, #e0e7ff 0%, #0D5EAF 100%)',
      },
    },
  },
  plugins: [],
}

