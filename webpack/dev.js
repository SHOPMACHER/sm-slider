const merge = require('webpack-merge');
const join = require('path').join;
const webpack = require('webpack');
const common = require('./common');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080'
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        hot: true
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
        })
    ]
});
