/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-border": '#E8E6EA',
        b50: '#e8e6ea',
        b75: '#a096a8',
        b100: '#796b85',
        b200: '#3f2b50',
        b300: '#18002c',
        b400: '#11001f',
        b500: '#0f001b',
        p50: '#f3e6fe',
        p75: '#cd96fa',
        p100: '#b86bf7',
        p200: '#992bf4',
        p300: '#8400f2',
        p400: '#5c00a9',
        p500: '#510094',
        y50: '#fffbf2',
        y75: '#fff0c8',
        y100: '#ffeab2',
        y200: '#ffe091',
        y300: '#ffda7a',
        y400: '#b39955',
        y500: '#9c854a'
      }
    },
  },
  plugins: [],
}

