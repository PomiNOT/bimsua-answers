module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif']
    },
    extend: {
      transitionTimingFunction: {
        'bouncy': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      animation: {
        'slidein': 'slidein 200ms forwards'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active']
    },
  },
  plugins: [],
}
