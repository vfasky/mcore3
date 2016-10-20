'use strict'

var path = require('path')
var config = require('./es5')

config.entry.mcore3 = path.join(__dirname, '../src/ie8')
config.output.filename = '[name].ie8.js'

config.module.loaders[0] = {
    test: /\.ts$/,
    loader: 'ts-loader'
}
config.module.ts = {
    'compilerOptions': {
        'target': 'es3',
        'sourceMap': true
    }
}

module.exports = config
