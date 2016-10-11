'use strict'

var path = require('path')
var distPath = path.join(__dirname, '../dist')

module.exports = {
    entry: {
        'h2svd-loader': path.join(__dirname, '../loader/h2svd/loader.es6')
    },
    output: {
        path: distPath,
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    // target: 'node',
    module: {
        loaders: [{
            test: /\.es6$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.es6', '.js']
    },
    externals: {
        htmlparser2: 'htmlparser2',
        'js-beautify': 'js-beautify',
        util: 'util',
        'loader-utils': 'loader-utils'
    }
}
