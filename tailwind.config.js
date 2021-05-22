module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4']
    }
  },
  darkMode: false,
  theme: {
    minWidth: {
      '96': '24rem'
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif']
    },
    extend: {
      transitionTimingFunction: {
        'bouncy': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      animation: {
        'slidein': 'slidein 200ms forwards',
        'hover': 'hover 6s infinite ease-in-out'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active'],
      textColor: ['hover', 'focus'],
      divideColor: ['hover', 'focus']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
