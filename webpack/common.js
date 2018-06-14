const join = require('path').join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: join(__dirname, '../src'),
    entry: [
        './index'
    ],
    output: {
        filename: 'sm-slider.js',
        library: 'sm-slider',
        libraryTarget: 'umd',
        path: join(__dirname, '../lib')
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }, {
            test: /\.(svg|png)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        }, {
            test: /\.(le|c)ss$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextWebpackPlugin('sm-slider.css')
    ]
};
