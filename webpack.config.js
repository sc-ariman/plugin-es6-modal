const webpack = require('webpack');
const path = require('path');

let filename;
let plugins;
if (process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        // remove console.log
        // drop_console: true
      },
    }),
    new webpack.ProvidePlugin({
      // $: 'jquery'
    }),
  ];

  filename = '[name].min.js';
} else {
  plugins = [];
  filename = '[name].js';
}

module.exports = {
  entry: {
    'pemodal': './js/pemodal.js',
  },
  output: {
    filename: filename,
    path: path.join(__dirname + '/dist/assets/js/'),
  },
  devtool: "#inline-source-map",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }],
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }],
  },
  plugins: plugins
};