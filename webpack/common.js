const join = require('path').join;

module.exports = {
    entry: [
        join(__dirname, '../src/index')
    ],
    output: {
        filename: 'sm-slider.js',
        path: join(__dirname, '../lib')
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    plugins: []
};
