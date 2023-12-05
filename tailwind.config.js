/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-blue' : '#0085C9',
        'ready-blue' : '#62BAFF',
        'main-blue' : '#0085C9',
        'finish-blue' : '#497BCA',
        },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(180deg, #0085C9 0%, #FFF 100%)',
        'custom-gradient2': 'linear-gradient(180deg, #FFF 0%, #0085C9 100%)',
      }),

      fontFamily : {
        'omyu_pretty' : ['omyu_pretty' ,'sans-serif'],
        'yg-jalnan' : ['yg-jalnan', 'sans-serif']
      }
    },
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.placeholder-center' : {
          '&::placeholder' : {
            textAlign : 'center',
            verticalAlign : 'middle',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};

