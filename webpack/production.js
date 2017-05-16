'use strict';

var webpack = require('webpack');
var baseConfig = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = Object.create(baseConfig);

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new HtmlWebpackPlugin({
    title: 'Helpkit App',
    filename: '../index.html',
    template: './build/index.template.hbs', // Load a custom template
    inject: 'body' // Inject all scripts into the body
  }),
  new ExtractTextPlugin('styles.min.css')
];

module.exports = config;
