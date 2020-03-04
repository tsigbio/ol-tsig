const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


const basePath = __dirname;
const distPath = '../dist';

const indextInput = 'examples/index.html';
const indexOutput = 'index.html';



const externals = {
  'ol/layer': 'ol.layer',
  'ol/layer/Group': 'ol.layer.Group',
  'ol/layer/Vector': 'ol.layer.Vector',
  'ol/source': 'ol.source',
  'ol/style': 'ol.style',
  'ol/format': 'ol.format',
  'ol/format/GeoJSON': 'ol.format.GeoJSON',
  'ol/util': 'ol.util',
  'ol/Map' : 'ol.Map',
  'ol/View': 'ol.View',
  'ol/proj': 'ol.proj',
  'ol/interaction/Select': 'ol.interaction.Select',
  'ol/events/condition': 'ol.events.condition'
};

function createExternals() {
  const createdExternals = {};
  for (const key in externals) {
    createdExternals[key] = {
      root: externals[key].split('.'),
      commonjs: key,
      commonjs2: key,
      amd: key
    };
  }
  return createdExternals;
}

function webpackConfigGenerator(env) {
  const sourcemaps = !!env.development;

  const webpackInitConfig = {
    resolve: {
      extensions: ['.js', '.ts'],
    },
    entry: {
      oltsig: ['./src/index.js'],
    },
    output: {
      path: path.join(basePath, distPath),
      filename: 'ol-tsig-es6.js', // [chunkhash]
      library: 'ol-tsig',
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/

        },
        {
          test: /\.ts/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: [
            MiniCSSExtract.loader,
            { loader: 'css-loader', options: { sourceMap: sourcemaps } },
            { loader: 'postcss-loader', options: { sourceMap: sourcemaps } },
          ],
        },

        {
          test: /\.less/,
          exclude: /node_modules/,
          use: [
            MiniCSSExtract.loader,
            { loader: 'css-loader', options: { sourceMap: sourcemaps } },
            { loader: 'postcss-loader', options: { sourceMap: sourcemaps } },
            { loader: 'less-loader', options: { sourceMap: sourcemaps } },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images/',
                publicPath: 'images/',
              },
            },
          ],
        },
      ],
    },
    /*
    optimization: {
      concatenateModules: false,
      minimize: false,
    },*/
    /*
    externals: [
      /^ol\/.+$/,
    ],
    */
    externals: createExternals(),
    plugins: [
      new HTMLWebpackPlugin({
        filename: indexOutput,
        template: indextInput,
        hash: true
      }),
      new MiniCSSExtract({
        filename: 'styles.css',
        chunkFilename: '[id].css',
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
      }),
      new ScriptExtHtmlWebpackPlugin({
        module: 'js'
      })
    ],
  };

  return webpackInitConfig;
}

module.exports = webpackConfigGenerator;
