const merge = require('webpack-merge');
const join = require('path').join;
const webpack = require('webpack');
const common = require('./common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    entry: [
        //'webpack-dev-server/client?http://127.0.0.1:8080'
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        hot: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }))
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, '../src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new ExtractTextWebpackPlugin('sm-slider.css')
    ]
});
