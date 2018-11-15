import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const input = 'src/index.js';
const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];
const plugins = [
    resolve({
        jsnext: true,
    }),
    commonjs({
        include: 'node_modules/**',
    }),
    babel({
        exclude: 'node_modules/**'
    }),
    postcss({
        extract: true,
        extensions: ['.less'],
        plugins: [
            autoprefixer,
        ],
    }),
];

const cjs = {
    input,
    output: {
        file: 'lib/sm-slider.js',
        format: 'cjs',
        indent: false,
    },
    external,
    plugins,
};

const es = {
    input,
    output: {
        file: 'es/sm-slider.js',
        format: 'es',
        indent: false,
    },
    external,
    plugins,
};

const mjs = {
    input,
    output: {
        file: 'es/sm-slider.mjs',
        format: 'es',
        indent: false,
    },
    plugins: [
        ...plugins,
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ]
};

const umdDev = {
    input,
    output: {
        file: 'dist/sm-slider.js',
        format: 'umd',
        name: 'SmSlider',
        indent: false,
    },
    plugins: [
        ...plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ]
};

const umdProd = {
    input,
    output: {
        file: 'dist/sm-slider.min.js',
        format: 'umd',
        name: 'SmSlider',
        indent: false,
    },
    plugins: [
        ...plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ]
};

export default [
    cjs,
    es,
    mjs,
    umdDev,
    umdProd,
];
