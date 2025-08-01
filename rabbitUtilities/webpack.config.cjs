const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  externalsPresets: { node: true },
  externals: [nodeExternals({
    allowlist: ['amqplib']
  })],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    library: "$",
    libraryTarget: "umd",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /.(js)$/,
        exclude: /(\.test\.js$|__tests__)/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
}