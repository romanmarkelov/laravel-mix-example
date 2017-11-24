const mix = require('laravel-mix');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const cssNext = require('postcss-cssnext');
const cssShort = require('postcss-short');
const cssAssets = require('postcss-assets');
const cssFontMagician = require('postcss-font-magician');

const PATHS = {
  assets: 'app/assets',
  dist: 'app/dist',
};

mix
  .setPublicPath(PATHS.dist)
  .options({
    processCssUrls: false,
    postCss: [
      cssNext(),
      cssShort(),
      cssAssets(),
      cssFontMagician(),
    ],
  })
  .js(`${PATHS.assets}/js/app.js`, 'js')
  .sass(`${PATHS.assets}/scss/main.scss`, 'css')
  .webpackConfig({
    plugins: [
      new NunjucksWebpackPlugin({
        templates: [
          {
            from: `${PATHS.assets}/views/index.njk`,
            to: 'html/index.html',
            context: { data: 'Example' },
          },
          { from: `${PATHS.assets}/views/news.njk`, to: 'html/news.html' },
        ],
      }),
    ],
  })
  .sourceMaps()
  .browserSync({
    proxy: false,
    server: {
      baseDir: 'app',
      index: 'dist/html/index.html',
    },
    files: [
      `${PATHS.dist}/html/*.html`,
      `${PATHS.dist}/css/*.css`,
      `${PATHS.dist}/js/*.js`,
    ],
  });
