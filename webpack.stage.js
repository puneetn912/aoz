/* Code generator by Bharath */
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new UglifyJSPlugin()
  ]
});
/* End of File */