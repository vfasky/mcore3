'use strict';

var path = require('path');
var config = require('./es5');

config.entry.mcore3 = path.join(__dirname, '../src/ie8');
config.output.filename = '[name].ie8.js';

config.buble = {
    transforms: { modules: false },
    target: { ie: 8 }
};
module.exports = config;