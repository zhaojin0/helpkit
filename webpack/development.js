'use strict';

var webpack = require('webpack');
var baseConfig = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var public_cli = path.join(__dirname, "../public");

var config = Object.create(baseConfig);

var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = 'inline-source-map';

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: 'Helpkit App',
    filename: '../index.html',
    template: './build/index.template.hbs', // Load a custom template
    inject: 'body' // Inject all scripts into the body
  }),
  new ExtractTextPlugin('styles/[name].css')
];

config.devServer = {
  outputPath: '../.tmp',
  filename : 'main.js',
  contentBase: public_cli,
  compress: true,
  port: 9000,
  hot: true,
  inline: true,
  watchOptions: {
    poll: true
  },
  proxy: {
    // proxy setup
    // '/auth': { target: 'https://some.auth/auth' },
  }
};

module.exports = config;
