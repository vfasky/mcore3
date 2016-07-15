'use strict';

var path = require('path');
var config = require('./es5');

config.entry.mcore3 = path.join(__dirname, '../src/ie8');
config.output.filename = '[name].ie8.js';

config.module.loaders[0] = {
    test: /\.es6$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
        presets: ['es2015-loose', 'stage-0'],
        plugins: ['transform-runtime'],
        cacheDirectory: true
    }
};

module.exports = config;
