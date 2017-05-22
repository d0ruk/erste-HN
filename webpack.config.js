/* eslint-env node */

const path = require("path");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const atImport = require("postcss-import");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
  const isDev = env === "development";

  return {
    context: __dirname,

    entry: {
      main: isDev
      ? ["webpack-dev-server/client?http://localhost:7777",
        "./src/index"]
      : ["./src/index"],
      vendor: ["erste", "mobx", "axios"]
    },

    output: {
      path: path.resolve(__dirname, "build"),
      filename: isDev
        ? "js/[name].js"
        : "js/[name]_[hash].js",
      sourceMapFilename: isDev
        ? "js/[name].map"
        : "js/[name]_[chunkhash].map",
      chunkFilename: isDev
        ? "js/[id].chunk.js"
        : "js/[id]_[chunkhash].chunk.js",
      publicPath: "/"
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            }
          },
          include: [path.resolve(__dirname, "src")]
        },
        {
          test: /\.svg$/,
          loader: "url-loader",
          query: {
            name: "static/images/[name].[hash:7].[ext]",
            limit: 10240
          }
        },
        {
          test: /\.eot(\?.*)?|.otf(\?.*)?$/,
          loader: "file-loader",
          query: {
            name: "static/fonts/[name].[hash:7].[ext]",
          }
        },
        {
          test: /\.ttf(\?.*)?$|\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
          query: {
            name: "static/fonts/[name].[hash:7].[ext]",
            limit: 10240
          }
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: "file-loader",
          query: {
            name: "static/images/[name].[hash:7].[ext]"
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: { sourceMap: true, importLoaders: 1 }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins() { return [autoprefixer, nested, atImport] }
                }
              }
            ]
          })
        },
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        title: "erste HN",
        filename: "index.html",
        template: "./src/util/index.ejs",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: { comments: false },
        },
        env: isDev ? "development" : "production"
      }),
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_ENV: isDev
              ? JSON.stringify("development")
              : JSON.stringify("production")
          }
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor"],
        minChunks: Infinity
      }),
      new ExtractTextPlugin({
        filename: "css/[name]_[contenthash].css",
        disable: isDev
      })
    ].concat(isDev
      ? [new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),]
      : [new CleanWebpackPlugin(["build/**/*.*"]),
        new CopyWebpackPlugin([
          {
            from: path.resolve(path.dirname(require.resolve("eruda")), "eruda.min.js"),
            to: "js/eruda.min.js"
          },
        ]),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: { comments: false },
        })]
    ),

    resolve: {
      modules: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, "src")
      ],
    },

    bail: true,
    target: "web",
    devtool: isDev ? "inline-source-map" : "hidden-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      open: true,
      port: 7777,
      inline: true,
      // stats: "verbose",
      historyApiFallback: true,
      hot: true,
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 700,
        poll: 1000
      },
      setup(app) {
        app.get("/__env", (req, res) => {
          res.json(process.env);
        });
      },
    }
  }
}
