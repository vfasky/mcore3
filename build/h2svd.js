'use strict'

const path = require('path')
const distPath = path.join(__dirname, '../dist')

module.exports = {
    entry: {
        'h2svd-loader': path.join(__dirname, '../loader/h2svd/loader.ts')
    },
    output: {
        path: distPath,
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    target: 'node',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    ts: {
        'compilerOptions': {
            'target': 'es5',
            'sourceMap': true
        }
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.ts', '.es6', '.js']
    },
    externals: {
        'htmlparser2': 'htmlparser2',
        'js-beautify': 'js-beautify',
        'util': 'util',
        'loader-utils': 'loader-utils'
    }
}
