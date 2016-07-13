'use strict';
var buble = require('buble');
var path = require('path');
var assign = require('object-assign');

module.exports = function bubleLoader(source) {
    var globalOptions = this.options.buble || {};
    var options = assign({}, {
        transforms: {
            modules: false
        }
    }, globalOptions);

    console.log(options);

    var transformed = buble.transform(source, options);

    var resourcePath = this.resourcePath;

    transformed.map.file = resourcePath;
    transformed.map.sources[0] = path.relative(process.cwd(), resourcePath);
    transformed.map.sourceRoot = process.cwd();

    this.cacheable && this.cacheable();
    this.callback(null, transformed.code, transformed.map);
};