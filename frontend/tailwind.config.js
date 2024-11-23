/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '380px',       // Extra small screens
        sm: '640px',       // Default small
        md: '768px',       // Medium screens
        'md-small': '689px', // Custom between sm and md
        lg: '1024px',      // Large screens
        xl: '1280px',      // Extra large
        '3xl': '1600px',   // Very large screens
        'hover-hover': { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [],
};
