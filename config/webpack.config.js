var fs = require('fs'),
path = require("path"),
assign = require('object-assign'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
version = require('../package.json').version,
webpack = require("webpack");


module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './src/bootstrap.js'],

  output: {
    publicPath: '/',
    path: path.resolve('public/'),
    filename: "bundle.js",
    sourceMapFilename: "[file].map"
  },

  resolve: {
    root: "src",
    extensions: ["", ".js", ".jsx"],
    /* allow for root relative names in require */
    modulesDirectories: ['node_modules', 'src']
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx?$/, loader: 'react-hot', include: path.join(__dirname, 'src') },
      { test: /\.(js|jsx)$/,
        include: [/src/],
        exclude: [/(node_modules|persistence)/],
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: true}},
      { test: /\.json$/, loader: 'json'},
      { test: /\.css$/, exclude: /.(\-|\.)min.css$/, loader: 'style!css!postcss'},
      { test: /\.sass/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg|jpeg|svg|gif)$/, exclude:/icons/, loader: 'url?limit=8192&name=assets/images/[name].[ext]'},
      { test: /\.(png|jpg|jpeg|svg|gif)$/, include:/icons/, loader: 'file?name=[name].[ext]'},
      { test: [/index\.html$/, /\.(ico)/], loader: 'file?name=[name].[ext]'}]
  },
  sassLoader: {
    includePaths: path.resolve(__dirname + "./src")
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    version: version,
    inject: false,
    template: 'src/assets/index.htm'
  }),
  new webpack.HotModuleReplacementPlugin()
  ],
  target: "web",
  devTool: "source-map",

  devServer: {
    proxy: {'*': {target: 'http://localhost:8080'}},
    contentBase: 'public/',
    quiet: true,
    colors: true,
  },

  resolveLoader: {
    root: [path.join(__dirname, "node_modules"), './src', 'vendor'],
  }
}
