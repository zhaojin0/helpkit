'use strict';
var path = require('path');

// For conveniance we create variable that holds the directory to bower_components
var node_modules_dir = __dirname + '/../node_modules/';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helperDirs = __dirname + '/../build/handlebars-helpers';
var i18n_dir = __dirname + '/../i18n';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].[hash].js',
    library: 'helpkit',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js'],
    noParse: ['client'],
    alias: {
      'bootstrap': node_modules_dir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
      'handlebars' : node_modules_dir + '/handlebars/runtime.js',
      'backbone.layoutmanager' : node_modules_dir + '/backbone.layoutmanager/backbone.layoutmanager.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2015-loose', 'stage-2']
        }
      },
      { test: /\.json$/, loader: "json" },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', ['style-loader', 'css-loader', 'resolve-url-loader'])
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'])
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader?helperDirs[]=' + helperDirs
      },
      { test: /\.svg$/, loader: 'url?limit=10240&mimetype=image/svg+xml&name=fonts/[name].[hash].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=10240&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]' },
      { test: /\.woff2$/, loader: 'url?limit=10240&mimetype=application/font-woff2&name=fonts/[name].[hash].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?limit=10240&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=6500&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[hash].[ext]' },
      { test: /\.(gif|png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
