const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  entry: {
    popup: "./src/popup.jsx",
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
  ],
};
