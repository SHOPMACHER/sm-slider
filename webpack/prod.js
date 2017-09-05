const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const common = require('./common');

module.exports = merge(common, {
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                screw_ie8: true,
                drop_debugger: true,
                dead_code: true,
                drop_console: true,
                unsafe: true,
                unsafe_comps: true
            },
            output: {
                comments: false
            }
        })
    ]
});
