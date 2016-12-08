'use strict'

const path = require('path')
const distPath = path.join(__dirname, '../dist')

module.exports = {
    entry: {
        'h2svd': path.join(__dirname, '../loader/h2svd/index.ts')
    },
    output: {
        path: distPath,
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    ts: {
        'compilerOptions': {
            'target': 'es5',
            'sourceMap': true
        },
        logLevel: 'error',
        silent: true,
        transpileOnly: true
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    externals: {
    }
}
