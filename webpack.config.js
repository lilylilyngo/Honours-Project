const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
// const FetchJsonWebpackPlugin = require("fetch-json-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.jsx",
    // background: "./src/background.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new Dotenv(),
    // new FetchJsonWebpackPlugin(),
  ],
};
