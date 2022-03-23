const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer()]
            }
          }
        }, "sass-loader"]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
    template: './public/index.html'
  }), new MiniCssExtractPlugin()],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  }
}