"use strict";
var buble = require('buble');
var path = require('path');
var assign = require('object-assign');

module.exports = function(source) {
    this.cacheable();

    var globalOptions = this.options.buble || {};
    var options = assign({}, {
        transforms: {
            modules: false
        }
    }, globalOptions);

    var transformed = buble.transform(source, options);

    var resourcePath = this.resourcePath;

    transformed.map.file = resourcePath;
    transformed.map.sources[0] = path.relative(process.cwd(), resourcePath);
    transformed.map.sourceRoot = process.cwd();

    this.callback(null, transformed.code, transformed.map);
};
