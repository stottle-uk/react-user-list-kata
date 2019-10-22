const root = require('app-root-path').path;

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
  ],
  output: {
    filename: 'compiled.js', // output file
    path: `${root}/build/server`,
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: [`${root}/server/src`, `${root}/node_modules`],
    alias: {
      client: `${root}/client`,
      libs: `${root}/libs`,
      '@shared': `${root}/libs/shared/`,
      '@store': `${root}/libs/store/`,
      '@notifications': `${root}/libs/notifications/`,
      '@users': `${root}/libs/users/`,
      '@router': `${root}/libs/router/`,
      '@app': `${root}/libs/app/`,
      '@pages': `${root}/libs/pages/`,
      '@pageEntries': `${root}/libs/pageEntries/`
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
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
