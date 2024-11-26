/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9900',
        secondary: '#F8F9FA',
        text: '#212529',
        border: '#DEE2E6',
        action: '#0D6EFD',
      },
    },
  },
  plugins: [],
}