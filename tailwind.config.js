/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF1E2E',
        'dark-primary': '#C2000E',
        blueish: '#00002a',
        'more-blue': '#000014',
        polygon: '#8247e5',
        metamask: {
          light: '#f6851b',
          'less-light': '#cd6116',
          dark: '#763d16',
          white: '#c0ad93',
        },
      },
      spacing: {
        'full-no-nav': 'calc(100vh - 4em)',
      },
    },
  },
  plugins: [],
}
