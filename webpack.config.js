const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const express = require('express');

const webpackPlugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(path.join(__dirname, './public/dist/lib/library-manifest.json'))
  })
];

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  entry: {
    'demo': './app/bootstrap.js',
  },
  output: {
    path: path.join(__dirname, `./public/dist`),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: "css-loader!less-loader",
        })
      },
      {
        test: /\.jsx$|\.js$|\.es6$/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: false,
    stats: 'minimal',
    setup: (app) => {
      // interesting
      app.use('/assets/lib/', express.static(path.join(__dirname, 'public', 'dist', 'lib')));
    }
  },
  plugins: webpackPlugins,
};

module.exports = webpackConfig;