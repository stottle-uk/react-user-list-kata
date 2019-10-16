const root = require('app-root-path').path;
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: `${root}/server/index.ts`,
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [
    /^[a-z\-0-9]+$/ // Ignore node_modules folder,
    // nodeExternals
  ],
  output: {
    filename: 'compiled.js', // output file
    path: `${root}/build_server`,
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: [`${root}/src`, `${root}/node_modules`],
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.config.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: `${root}/server/tsconfig.server.json`
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '/static/media/[name].[hash:8].[ext]'
        }
      },
      { test: /\.css$/, loader: 'ignore-loader' }
    ]
  }
};
