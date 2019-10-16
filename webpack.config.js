const path = require('path');
const process = require('process');

function getenv(name, defaultValue) {
  return process.env[name] || defaultValue;
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: {
          host: getenv('WDS_PROXY_API_HOST', '127.0.0.1'),
          protocol: 'http',
          port: getenv('WDS_PROXY_API_PORT', '5000')
        },
        ignorePath: true
      }
    }
  }
};
