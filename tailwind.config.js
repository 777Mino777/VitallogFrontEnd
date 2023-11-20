/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-blue' : '#0085C9',
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(180deg, #0085C9 0%, #FFF 100%)',
      })
    },
  },
  variants: {},
  plugins: [],
};

