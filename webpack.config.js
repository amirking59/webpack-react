const path = require('path');

// tools
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

// html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer()],
            },
          },
        }, 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
    template: './public/index.html',
  }), new MiniCssExtractPlugin()],
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    static: {
      directory: 'public',
    },
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
  },
};
