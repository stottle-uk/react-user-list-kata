'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const webpackConfig = require('../server/webpack.server.config');

const compiler = webpack(webpackConfig);

const errerHandler = arg => {
  console.log('Compiler Errors', arg);
};

compiler.run((err, stats) => {
  let messages;
  if (err) {
    if (!err.message) {
      return errerHandler(err);
    }
    messages = {
      errors: [err.message],
      warnings: []
    };
  } else {
    messages = stats.toJson({ all: false, warnings: true, errors: true });
  }
  if (messages.errors.length) {
    // Only keep the first error. Others are often indicative
    // of the same problem, but confuse the reader with noise.
    if (messages.errors.length > 1) {
      messages.errors.length = 1;
    }

    console.log(messages);

    return errerHandler(new Error(messages.errors.join('\n\n')));
  }
  if (
    process.env.CI &&
    (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
    messages.warnings.length
  ) {
    console.log(
      chalk.yellow(
        '\nTreating warnings as errors because process.env.CI = true.\n' + 'Most CI servers set it automatically.\n'
      )
    );
    return errerHandler(new Error(messages.warnings.join('\n\n')));
  }

  return {
    stats,
    warnings: messages.warnings
  };
});
