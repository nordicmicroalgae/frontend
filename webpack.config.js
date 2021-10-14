const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getenv(name, defaultValue) {
  return process.env[name] || defaultValue;
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'nµa frontend',
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: {
          host: getenv('WDS_PROXY_API_HOST', '127.0.0.1'),
          protocol: 'http',
          port: getenv('WDS_PROXY_API_PORT', '5000')
        }
      }
    },
    client: {
      overlay: {
        errors: true,
        warnings: true
      }
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.s[ac]ss$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
};
