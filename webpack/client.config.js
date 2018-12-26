const config = require('config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const loaders = require('./loaders');
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const os = require('os');

////////////////////////////////////////////////////////////////////////////////
// per-environment plugins
const environmentPlugins = (() => {
  if (config.get('minify')) {
    return [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|html|css)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ];
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      return [
        // Hot reloading is set up in webpack-dev-server.js
      ];

    default:
      return [];
  }
})();

module.exports = {
  mode: config.get('minify') ? 'production' : 'development',
  entry: {
    app: [
      'whatwg-fetch',
      'core-js/es6/object',
      'core-js/es6/array',
      'core-js/es6/symbol',
      'core-js/es6/promise',
      'core-js/es6/map',
      'core-js/es6/set',
      './entry/client.tsx'
    ]
  },

  devServer: {
    hot: false
  },

  optimization: config.get('minify')
    ? {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      }
    : undefined,

  performance: {
    assetFilter(filename) {
      // Don't size test uncompressed javascript - we just care about the .js.gz files
      return !/\.(js|map)$/.test(filename);
    }
  },

  plugins: [
    // Define global letiables in the client to instrument behavior.
    new webpack.DefinePlugin({
      // Flag to detect non-production
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),

      // ALlow switching on NODE_ENV in client code
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    // Process index.html and insert script and stylesheet tags for us.
    new HtmlWebpackPlugin({
      template: './entry/index.html',
      inject: 'body'
    }),

    // Don't proceed in generating code if there are errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Extract embedded css into a file
    new ExtractTextPlugin(
      config.get('minify') ? '[name].[chunkhash].css' : '[name].css'
    ),

    // Show a nice progress bar on the console.
    new ProgressBarPlugin({ clear: false }),
    // new HappyPack({
    //   id: "ts",
    //   threads: process.env.CI ? 1 : Math.max(1, os.cpus().length / 2 - 1),
    //   loaders: [
    //     {
    //       path: "ts-loader",
    //       query: { happyPackMode: true, configFile: "tsconfig.client.json" },
    //     },
    //   ],
    // }),
    // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),

    ...(process.env.ANALYZE
      ? [new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()]
      : [])
  ].concat(environmentPlugins),

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: config.get('minify') ? 'client.[chunkhash].js' : 'client.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, '../modules'), 'node_modules'],
    alias: {
      '@material-ui/core': '@material-ui/core/es'
    }
  },

  module: {
    rules: [
      {
        // Transpile non-IE compatible node modules.
        test: /\.jsx?$/,
        // Whitelist the modules inside the () in this regex:
        include: /node_modules\/(@material-ui)\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      loaders.clientSideTypeScript,
      loaders.graphql,
      loaders.scss
    ].concat(loaders.allImagesAndFontsArray)
  }
};
