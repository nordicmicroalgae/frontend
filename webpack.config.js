const path = require('path');
const process = require('process');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getenv(name, defaultValue) {
  return process.env[name] || defaultValue;
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src', 'components'),
      Containers: path.resolve(__dirname, 'src', 'containers'),
      Services: path.resolve(__dirname, 'src', 'services'),
      Slices: path.resolve(__dirname, 'src', 'slices'),
      Store: path.resolve(__dirname, 'src', 'store'),
      Styles: path.resolve(__dirname, 'src', 'styles'),
      Utilities: path.resolve(__dirname, 'src', 'utils'),
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, 'src', 'favicon.ico'),
        path.resolve(__dirname, 'src', 'icon.svg'),
        path.resolve(__dirname, 'src', 'apple-touch-icon.png'),
        path.resolve(__dirname, 'src', 'icon-192.png'),
        path.resolve(__dirname, 'src', 'icon-512.png'),
        path.resolve(__dirname, 'src', 'manifest.webmanifest'),
      ],
    }),
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
    proxy: [
      {
        context: ['/api', '/media'],
        target: {
          host: getenv('WDS_PROXY_API_HOST', '127.0.0.1'),
          protocol: 'http',
          port: getenv('WDS_PROXY_API_PORT', '5000')
        }
      }
    ],
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: 'modern-compiler',
              implementation: require('sass-embedded'),
              sassOptions: {
                loadPaths: [path.resolve(__dirname, 'src/styles/partials')]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
