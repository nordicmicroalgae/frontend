const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: {
          host: 'backend',
          protocol: 'http',
          port: 5000
        },
        ignorePath: true
      }
    }
  }
};
