const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = (env) => {
  const { ifProd, ifNotProd, ifProduction } = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: {
      app: ['babel-polyfill', 'whatwg-fetch', './app.js'],
    },
    output: {
      path: resolve('dist'),
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    performance: {
      hints: ifProd('warning', false),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            babelrc: ifProd(false, true),
            presets: [
              ['es2015'],
            ],
            plugins: ['transform-runtime'],
          },
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
        {
          test: /\.css$/,
          include: resolve('src/css'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ifProd('css-loader!postcss-loader', 'css-loader?sourceMap!postcss-loader'),
          }),
        },
      ],
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      ifProd(new OfflinePlugin({
        externals: ['img/*'],
      })),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: ifProd('"production"', '"development"'),
        },
      }),
      new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest'],
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyWebpackPlugin([
        { from: './img', to: 'img' },
      ]),
    ]),
    externals: ifProduction([nodeExternals()]),
    node: {
      fs: 'empty',
    },
  };
  if (env.debug) {
    console.log(config);
  }
  return config;
};
