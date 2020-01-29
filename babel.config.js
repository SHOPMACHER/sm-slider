module.exports = api => {
    api.cache(true);

    return {
        presets: [
            require('@babel/preset-env'),
            require('@babel/preset-flow'),
        ],
        plugins: [
            'add-module-exports',
            require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-proposal-optional-chaining'),
            require('@babel/plugin-proposal-function-bind')
        ]
    }
};
