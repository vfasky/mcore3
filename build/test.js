/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
'use strict'

var path = require('path')
var distPath = path.join(__dirname, '../test')

module.exports = {
    entry: 'mocha!' + path.join(__dirname, '../test/index.es6'),
    output: {
        path: distPath,
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.es6$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.html$/,
            loader: path.resolve(__dirname, '../loader/h2svd/loader.es6')
        }]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.es6', '.js'],
        jquery: 'jQuery'
    },
    externals: {
        jquery: 'jQuery'
    }
}
