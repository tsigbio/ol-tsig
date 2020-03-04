const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
  mode: 'production',
  output: {
    filename: 'ol-tsig.min.js', // [chunkhash]
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
  ],
};

module.exports = webpackConfig;
