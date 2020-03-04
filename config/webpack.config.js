const merge = require('webpack-merge');
const baseConfigGenerator = require('./webpack.config.base.js');
const baseConfigGeneratorES6 = require('./webpack.config.base.es6.js'); //Sin transpilar
const prodConfig = require('./webpack.config.prod.js');
const devConfig = require('./webpack.config.dev.js');

function webpackEnviromentSelector(env) {
  let config;
  let baseConfig

  if (env.production) config = prodConfig;
  if (env.development) config = devConfig;

  if (env.es6) {
    baseConfig = baseConfigGeneratorES6(env);
  } else {
    baseConfig = baseConfigGenerator(env);
  }


  return merge(baseConfig, config);
}

module.exports = webpackEnviromentSelector;
