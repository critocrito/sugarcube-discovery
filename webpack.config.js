/* eslint @typescript-eslint/no-var-requires: off */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./manifest");
const pkg = require("./package.json");

module.exports = {
  entry: {
    popup: "./src/js/popup/popup.tsx",
    options: "./src/js/options/options.tsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 30000,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/js/popup/popup.html",
      filename: "./popup.html",
    }),
    new HtmlWebPackPlugin({
      template: "./src/js/options/options.html",
      filename: "./options.html",
    }),
    new CopyPlugin([{from: "icons", to: "icons"}]),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[name].[chunkhash:8].css",
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
        extend: {
          version: pkg.version,
          name: pkg.name,
          description: pkg.description,
          // eslint-disable-next-line @typescript-eslint/camelcase
          homepage_url: pkg.homepage,
        },
      },
    }),
  ],
};
