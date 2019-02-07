
module.exports = {
  mode: "development",
  entry: {
    index: "./js/index.js"
  },
  output: {
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  }
}