/**
 *
 *
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

const path = require('path');

module.exports = {
    entry: {
        app: path.join(__dirname, './src/index.es6')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.es6$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015'],
            }
        },{
            test: /\.html$/,
            loader: path.resolve(__dirname, '../../dist/h2svd-loader.js'),
        }]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.es6', '.js'],
        jquery: 'jQuery',
        alias: {
            mcore3: path.resolve(__dirname, '../../src/index.es6')
        }
    },
    externals: {
        jquery: 'jQuery'
    }
};
