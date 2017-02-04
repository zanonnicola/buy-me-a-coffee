const autoprefixer = require('autoprefixer');
const precss = require('precss');
const font = require('postcss-font-magician');

module.exports = {
  plugins: [
    autoprefixer({
      browserslist: 'last 2 versions',
    }),
    precss(),
    font({
      variants: {
        'Courier Prime': {
          300: ['woff, woff2'],
          700: ['woff, woff2'],
        },
      },
      display: 'swap',
      hosted: ['./src/fonts'],
    }),
  ],
};
