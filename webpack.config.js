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
    host: getenv('NORDICMICROALGAE_FRONTEND_HOST', '127.0.0.1'),
    proxy: {
      '/api': {
        target: {
          host: getenv('NORDICMICROALGAE_BACKEND_HOST', '127.0.0.1'),
          protocol: 'http',
          port: getenv('NORDICMICROALGAE_BACKEND_PORT', '5000')
        },
        ignorePath: true
      }
    }
  }
};
