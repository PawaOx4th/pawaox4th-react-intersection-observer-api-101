module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        neon: {
          violet: '#892CDC',
          bubbles: '#E4FBFF',
          eucalyptus: '#28DF99',
          shampoo: '#FFC1F3',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
