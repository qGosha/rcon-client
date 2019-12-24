const isProd = process.env.NODE_ENV !== "development";
const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    historyApiFallback: true
  },
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  mode: isProd ? "production" : "development",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2|gif|png|jpg)$/,
        loader: require.resolve("file-loader")
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.js$/,
        include: /src/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /__tests__/, /__mocks__/],
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "./src")
    }
  }
};
