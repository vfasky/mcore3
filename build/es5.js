'use strict';

var path = require('path');
var distPath = path.join(__dirname, '../dist');

module.exports = {
    entry: {
        mcore3: path.join(__dirname, '../src/index')
    },
    output: {
        path: distPath,
        filename: '[name].es5.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.es6$/,
                loader: path.resolve(__dirname, '../loader/buble'),
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.es6', '.js']
    }
};