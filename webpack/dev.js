const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        inline: true,
    },
    devtool: 'cheap-eval-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
