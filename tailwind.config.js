module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active']
    },
  },
  plugins: [],
}
