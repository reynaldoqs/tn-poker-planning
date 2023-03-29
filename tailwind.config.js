/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Urbanist"', 'sans-serif'],
    },
    extend: {
      colors: {
        bgLight: '#22262B',
        bgMedium: '#1C1E1F',
        bgDark: '#151718',
        bgDarker: '#101111',
        txtLight: '#E5DCC0',
        txtMedium: '#D6D3D3',
        txtDark: '#828282',
        primary: '#D1342F',
        secondary: '#01B763',
        error: '#ff0047',
        success: '#01dc69',
      },
      borderRadius: {
        pk_sm: '1rem',
        pk_md: '2rem',
        pk_lg: '3rem',
      },
    },
  },
  plugins: [require('tailwindcss-radix')()],
};
