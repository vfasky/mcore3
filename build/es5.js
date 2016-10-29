'use strict'

const path = require('path')
const distPath = path.join(__dirname, '../dist')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        mcore3: path.join(__dirname, '../src/es5')
    },
    output: {
        path: distPath,
        libraryTarget: 'umd',
        filename: '[name].es5.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    ts: {
        'compilerOptions': {
            'target': 'es5'
        }
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.ts', '.js'],
        jquery: 'jQuery'
    },
    externals: {
        jquery: {
            root: '$',
            commonjs2: 'jquery',
            commonjs: 'jquery',
            amd: 'jquery'
        }
    },
    plugins: [
        new CleanWebpackPlugin('./dist/tsd', {
            root: path.join(__dirname, '../')
        }),
        new TypedocWebpackPlugin({
            name: 'mcore3',
            out: '../docs',
            module: 'commonjs',
            target: 'es5',
            exclude: '**/*+(node_modules|h2svd)/**/*.*',
            excludeExternals: true,
            includeDeclarations: false,
            ignoreCompilerErrors: true
        })
    ]
}
