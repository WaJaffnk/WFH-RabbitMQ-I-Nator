const path = require('path');

module.exports = [
  // CommonJS output
  {
    entry: './index.js',
    externals: {
      amqplib: 'commonjs amqplib', //  Ensures amqplib is treated as an external CommonJS module
    },
    output: {
      filename: 'index.cjs', // Output filename
      path: path.resolve(__dirname, ''),
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'commonjs' }]]
            }
          }
        }
      ]
    }
  },
  // ES Modules output
  {
    entry: './index.js',
    externals: {
      amqplib: 'commonjs amqplib', //  Ensures amqplib is treated as an external CommonJS module
    },
    output: {
      filename: 'index.mjs', // Output filename
      path: path.resolve(__dirname, ''),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        }
      ]
    }
  }
];