const mix = require('laravel-mix');

mix
  .sass('app/assets/scss/app.scss', 'app/dist/')
  .options({
    postCss: [
      require('postcss-cssnext')(),
      require('postcss-short')(),
      require('postcss-assets')(),
      require('postcss-font-magician')(),
    ],
  });
