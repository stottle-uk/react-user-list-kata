'use strict';
// see https://github.com/remy/nodemon/issues/95#issuecomment-143423483
process.stdout.isTTY = true;
process.env.NODE_ENV = 'development';

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.server.config');
const spawnNodemon = require('./utils/nodemon').default;
const logger = require('./utils/logger').default;

const compiler = webpack(webpackConfig);

const bundlePath = path.resolve(webpackConfig.output.path, webpackConfig.output.filename);

let nodemon;

console.log(chalk.cyan('\nWebpack starts to build and watch your files...\n'));

compiler.watch(null, (err, stats) => {
  logger(err, stats);

  console.log(chalk.magenta('[Webpack]') + ' Compiled' + chalk.grey(' [timestamp:' + Date.now() + ']'));
  // spawn nodemon process if it wasn't already spawned
  if (!nodemon) {
    console.log(chalk.cyan('\nStarting nodemon...\n'));
    nodemon = spawnNodemon(bundlePath);
  }
});
