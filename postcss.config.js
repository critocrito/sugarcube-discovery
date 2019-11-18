module.exports = {
  plugins: {
    "postcss-import": {},
    // Make sure css-variables comes before autoprefixer
    "postcss-css-variables": {},
    autoprefixer: {},
    "postcss-svg": {},
    "postcss-preset-env": {browsers: "> 0.2%"},
  },
};
