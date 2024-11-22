/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
        '1xs':'689px',
        // Custom extra small breakpoint
        '3xl': '1600px', // Custom large breakpoint
        'hover-hover': { 'raw': '(hover: hover)' }, // Custom media query
      },
    },
  },
  plugins: [],
}

