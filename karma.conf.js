var bower_dir = __dirname + '/bower_components';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helperDirs = __dirname + '/build/handlebars-helpers';
var i18n_dir = __dirname + '/i18n';
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: ['PhantomJS'],
    files: [
      'node_modules/es5-shim/es5-shim.js',
      'test/**/*.spec.*',
      {pattern: 'src/**/*', watched: true, included: false}
    ],
    preprocessors: {
      'test/**/*.spec.*': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.json'],
        noParse: ['client'],
        alias: {
          // alias package
          // 'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap.js'
        }
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'es2015-loose', 'stage-2']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
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
          { test: /\.woff(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
          { test: /\.woff2(\?.*)?$/,  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
          { test: /\.ttf(\?.*)?$/,    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
          { test: /\.eot(\?.*)?$/,    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]' },
          { test: /\.svg(\?.*)?$/,    loader: 'url-loader?mimetype=image/svg+xml' },
          { test: /\.(gif|png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
      ]
    },
    webpackServer: {
      noInfo: true
    },
    singleRun: true
  });
};
