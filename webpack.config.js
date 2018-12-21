let path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/main.ts",
  target: "web",
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              configFileName: path.resolve(__dirname, "src/tsconfig.json")

            }
          }
        ],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'source-map',
};


