const path = require("path");

module.exports = {
  entry: {
    main: path.resolve("./src/main.ts"),
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve("./dist/"),
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  mode: "development",
};
