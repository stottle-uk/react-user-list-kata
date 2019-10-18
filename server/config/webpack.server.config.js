const root = require('app-root-path').path;
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: `${root}/server/src/index.ts`,
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
    path: `${root}/build/server`,
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: [`${root}/server/src`, `${root}/node_modules`],
    // Add in `.ts` and `.tsx` as a resolvable extension.
    alias: {
      client: `${root}/client`,
      libs: `${root}/libs`,
      '@notifications': `${root}/libs/notifications/`,
      '@shared': `${root}/libs/shared/`,
      '@users': `${root}/libs/users/`,
      '@store': `${root}/libs/store/`
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              cacheDirectory: true
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
