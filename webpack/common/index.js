const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = require('./context');

module.exports = {
    entry: resolve(context, 'src/index.ts'),
    output: {
        filename: 'sm-slider.js',
        library: 'sm-slider',
        libraryTarget: 'umd',
        path: resolve(context, 'lib'),
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader',
            },
            {
                test: /\.(svg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(context, 'src/index.html'),
        }),
    ]
};
