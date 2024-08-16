/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '40px': '40px',  // Ajoute une marge de 40 pixels
        '60px': '60px',  // Ajoute une marge de 60 pixels
        '80px': '80px',  // Ajoute une marge de 80 pixels
        '229': '229px',
        '-200': '-200px',
        '-4': '-4px',
      },
    },
  },
  plugins: [],
}

