var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: {
    'pemodal': './js/pemodal.js',
  },
  output: {
    path: __dirname + '/dist/js/',
    filename: "[name].js"
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        loader: ['babel-loader'],
        include: [
          path.resolve(__dirname, "./js"),
        ],
        test: /\.js/,
        exclude: /node_modules|bower_components/,
        presets: ['es2015'],
        query  : {
          compact: false,
        },
        plugins: ['transform-es2015-modules-umd']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ]
};