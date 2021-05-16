const path = require("path");
const webpack = require("webpack");
const DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
  },
  mode,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new DeclarationBundlerPlugin({
        moduleName: "some.path.moduleName",
        out: "./builds/bundle.d.ts",
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
