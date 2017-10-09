const mix = require('laravel-mix');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const PATHS = {
  assets: 'app/assets',
  dist: 'app/dist'
};

mix
  .setPublicPath(PATHS.dist)
  .options({
    postCss: [
      require('postcss-cssnext')(),
      require('postcss-short')(),
      require('postcss-assets')(),
      require('postcss-font-magician')(),
    ],
  })
  .js(`${PATHS.assets}/js/app.js`, 'js')
  .sass(`${PATHS.assets}/scss/main.scss`, 'css')
  .webpackConfig({
    plugins: [
      new NunjucksWebpackPlugin({
        template: [
          {from: `${PATHS.assets}/views/index.njk`, to: 'views/index.html', context: {user: 'webmarkelov'}},
          {from: `${PATHS.assets}/views/news.njk`, to: 'views/news.html'}
        ]
      })
    ]
  })
