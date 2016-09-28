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
        "presets": ["stage-0", "es2015"],
        "plugins": ["transform-runtime", "transform-es3-property-literals", "transform-es3-member-expression-literals"],
    }
};

module.exports = config;
