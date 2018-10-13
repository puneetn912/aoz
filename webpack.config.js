var webpack = require("webpack");
var path = require('path');
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {main: './lib/src/js/index.js'},
    devtool: 'eval',
    output: {
        path: path.resolve(`public/dist`),
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
          name (module) {
            name ='vendor'
            return
          }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['public/dist']),
        new HtmlWebpackPlugin({
          template: 'lib/src/index.html',
          chunksSortMode: 'dependency'
        })
    ],
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader, 
              "css-loader"
            ]
        },
        {
            test: /.html$/,
            use: [{
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }]
        },
        {
            test: /.(scss)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      require('precss'),
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                presets: ['env']
                }
            }
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader?limit=100000' 
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {}  
              }
            ]
        }
    ]
  }
};