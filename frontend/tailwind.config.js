module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
      minHeight: {
          '0': '0',
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'full': '100%',
      },
  },
  variants: {
      extend: {},
  },
  plugins: [],
}