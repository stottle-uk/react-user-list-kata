'use strict';

process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../server/webpack.server.config');
const logger = require('./utils/logger').default;

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  logger(err, stats);

  console.log(chalk.green('\nBuild successful!'));
});
