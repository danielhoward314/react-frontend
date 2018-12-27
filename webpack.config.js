const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: { main: './src/client/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[c|a]ss$/,
        use:  [  'style-loader',
                 MiniCssExtractPlugin.loader,
                 'css-loader',
                 'postcss-loader',
                 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/public/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};


// const path = require('path');
// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


// module.exports = {
//     devtool: 'source-map',
//     entry: './src/client/index.js',
//     output: {
//         path: path.join(__dirname, '/dist'),
//         filename: 'index_bundle.js'
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['@babel/preset-react']
//                 }
//             }
//         }, {
//             test: /\.css$/,
//             use: ExtractTextPlugin.extract(
//                 {
//                     fallback: 'style-loader',
//                     use: ['css-loader']
//                 }
//             )
//         },
//         {
//             test: /\.(png|jpg|gif)$/,
//             use: [
//                 {
//                     loader: 'file-loader'
//                 }
//             ]
//         }]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             hash: true,
//             filename: 'index.html',  //target html
//             template: './src/public/index.html' //source html
//         }),
//         new ExtractTextPlugin({ filename: 'css/style.css' })
//     ]
// };
