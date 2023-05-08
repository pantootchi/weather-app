const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [new HtmlWebpackPlugin({
    hash: true,
    title: 'Weather App',
    template: './src/template.html',
    favicon: './src/assets/favicon.png',
  })],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [{ test: /\.(s(a|c)ss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader']},
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
};
