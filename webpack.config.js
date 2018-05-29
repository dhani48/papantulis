const webpack = require('webpack');
const path = require('path');
const debug = require('debug');

// const BUILD_DIR = path.resolve(__dirname, 'src/public');
const BUILD_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'src/app');
const SCSS_DIR = path.resolve(__dirname, 'src/scss');
const SRC = path.resolve(__dirname, 'src');

var config = {
  cache: true,
  context: path.join(__dirname, "src"),
  // devtool: 'source-map',
  devtool: debug ? "inline-sourcemap" : false,
  entry: APP_DIR + '/index.jsx',
  watch: true,
  output: {
    path: BUILD_DIR,
    filename: "client.min.js"
  },

  module : {
    loaders : [
      {
        test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property
        loader:"file-loader",
        query:{
          name:'[path][name].[ext]',
          outputPath: '../'
        }
      },{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query:{
          limit:'10000',
          name:'[path][name].[ext]',
          outputPath: '../'
        }
      }, {
        test: /\.jsx?$/,
        include : APP_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-3','es2015'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'stage-3']
        }
      }, 
      {
        test: /\.scss$/,
        loaders: ["style-loader","css-loader","sass-loader"]
      }
    ]
  },
  devServer: {
    disableHostCheck: true,   // That solved it
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
      
    },
    contentBase: "src",
    hot: true,
    proxy: {
      '/api': {
      changeOrigin: true,
      target: 'http://localhost:3002',
      secure: false}
    }
    // proxy: {
    // '^/api/*': {
    //   target: 'http://localhost:3000',
    //   secure: false
    // }
  
 },

  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ],
}

module.exports = config;
