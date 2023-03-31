const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/options/index.html",
    "./src/**/*.{models,ts,jsx,tsx,vue}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: {
        100: '#5e5ec0',
        400: '#4A4AD4',
        500: '#2323D7'
      },
      green: {
        400: '#4AD44A',
        500: '#23D723'
      },
      'white-app': {
        500: '#F5EDED',
        600: '#C7BCBC',
        700: '#130b0b',
      },
      red: {
        50: '#fbeeee',
        400: '#D44A4A',
        500: '#D72323'
      },
      'black-app': {
        400: '#968787',
        500: '#3E3636'
      }
    },
    extend: {},
  },
  plugins: [],
}
